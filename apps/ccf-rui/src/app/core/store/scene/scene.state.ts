import { Computed, DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import { SpatialEntity, SpatialPlacement, SpatialSceneNode } from '@hra-api/ng-client';
import { Matrix4, toRadians } from '@math.gl/core';
import { NgxsOnInit, State } from '@ngxs/store';
import { AABB, Vec3 } from 'cannon-es';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { getOriginScene, getTissueBlockScene } from 'ccf-scene-utils';
import { GlobalConfigState } from 'ccf-shared';
import { isEqual } from 'lodash';
import { Observable, combineLatest, defer, of } from 'rxjs';
import {
  catchError,
  concatMap,
  distinctUntilChanged,
  filter,
  map,
  share,
  startWith,
  switchMap,
  take,
  throttleTime,
} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GlobalConfig } from '../../services/config/config';
import { ModelState } from '../model/model.state';
import { RegistrationState } from '../registration/registration.state';
import { VisibilityItem } from './../../models/visibility-item';
import { ReferenceDataState } from './../reference-data/reference-data.state';

/**
 * Scene state model
 */
export interface SceneStateModel {
  /** Show collisions */
  showCollisions: boolean;
  /** Defer collisions */
  deferCollisions: boolean;
}

/** Collision data */
interface Collision {
  /** Node id */
  id: string;
}

/** Duration to throttle collision requests */
const NODE_COLLISION_THROTTLE_DURATION = 10;

/**
 * Compute the bounding box for a node
 *
 * @param model Node
 * @returns Bounding box
 */
function getNodeBbox(model: SpatialSceneNode): AABB {
  const mat = new Matrix4(model.transformMatrix);
  const lowerBound = mat.transformAsPoint([-1, -1, -1], []);
  const upperBound = mat.transformAsPoint([1, 1, 1], []);
  return new AABB({
    lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
    upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i]))),
  });
}

/**
 * 3d Scene state
 */
@StateRepository()
@State<SceneStateModel>({
  name: 'scene',
  defaults: {
    showCollisions: !environment.production,
    deferCollisions: false,
  },
})
@Injectable()
export class SceneState extends NgxsImmutableDataRepository<SceneStateModel> implements NgxsOnInit {
  /** Injector */
  private readonly injector = inject(Injector);
  /** Http client */
  private readonly http = inject(HttpClient);
  /** Global config */
  private readonly globalConfig = inject<GlobalConfigState<GlobalConfig>>(GlobalConfigState);

  /** Scene nodes */
  @Computed()
  get nodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([
      this.placementCube$,
      this.referenceOrganNodes$,
      this.previousRegistrationNodes$,
      this.nodeCollisions$,
      this.spatialKeyBoardAxis$,
    ]).pipe(
      map(([placement, nodes, prevNodes, collisions, axis]) => [
        ...placement,
        ...prevNodes,
        ...nodes,
        ...axis,
        ...(this.snapshot.showCollisions ? collisions : []),
      ]),
    );
  }

  /** Rotated nodes */
  @Computed()
  get rotatedNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.rotation$, this.nodes$]).pipe(
      map(([rotation, nodes]) => {
        if (rotation === 0) {
          return nodes;
        }
        return nodes.map((n) => ({
          ...n,
          transformMatrix: new Matrix4(Matrix4.IDENTITY)
            .rotateY(toRadians(rotation))
            .multiplyRight(n.transformMatrix ?? []),
        }));
      }),
    );
  }

  /** Observable of spatial nodes */
  @Computed()
  get referenceOrganNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.model.anatomicalStructures$, this.model.extractionSites$, this.model.organIri$]).pipe(
      map(([anatomicalStructures, extractionSites, organIri]) => {
        const organ = this.getOrganSpatialEntity(organIri as string);
        const originScene = organIri ? getOriginScene(organ, false, true) : [];
        const organScene = this.createSceneNodes(
          organIri as string,
          [...anatomicalStructures, ...extractionSites] as VisibilityItem[],
        );
        return [...originScene, ...organScene];
      }),
    );
  }

  /** Reference organ nodes */
  @Computed()
  get referenceOrganSimpleNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.model.anatomicalStructures$, this.model.organIri$, this.referenceData.state$]).pipe(
      map(([anatomicalStructures, organIri, db]) =>
        anatomicalStructures
          .map((item): SpatialSceneNode[] => {
            if (db.sceneNodeLookup[item.id]) {
              return [
                {
                  ...(db.simpleSceneNodeLookup[item.id] as SpatialSceneNode),
                  opacity: (item.opacity ?? 100) / 100,
                  color: [255, 255, 255, 255],
                },
              ];
            }
            return (db.anatomicalStructures[organIri as string] || [])
              .filter((node) => node.representation_of === item.id)
              .map(
                (node): SpatialSceneNode => ({
                  ...(db.simpleSceneNodeLookup[node['@id']] as SpatialSceneNode),
                  opacity: (item.opacity ?? 100) / 100,
                  color: [255, 255, 255, 255],
                }),
              );
          })
          .reduce<SpatialSceneNode[]>((acc, nodes) => acc.concat(nodes), []),
      ),
      distinctUntilChanged(isEqual),
    );
  }

  /** Node collisions */
  @Computed()
  get nodeCollisions$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.referenceOrganSimpleNodes$, this.collisions$, this.placementCube$]).pipe(
      throttleTime(NODE_COLLISION_THROTTLE_DURATION, undefined, { leading: true, trailing: true }),
      map(([nodes, collisions, placement]) => {
        if (collisions !== undefined) {
          return this.filterNodeCollisions(nodes, collisions);
        } else if (placement.length > 0) {
          return this.filterNodeBBox(nodes, placement[0]);
        }
        return [];
      }),
      share(),
    );
  }

  /** Previous nodes */
  @Computed()
  get previousRegistrationNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([
      this.model.organIri$,
      this.model.showPrevious$,
      this.registration.previousRegistrations$ as Observable<SpatialEntityJsonLd[]>,
    ]).pipe(
      map(([organIri = '', showPrevious, previousRegistrations]) =>
        showPrevious ? this.getPreviousRegistrationNodes(organIri, previousRegistrations) : [],
      ),
    );
  }

  /** Axis nodes */
  @Computed()
  get spatialKeyBoardAxis$(): Observable<SpatialSceneNode[]> {
    const nonEmptyOrganIri = this.model.organIri$.pipe(filter((iri): iri is string => iri !== undefined && iri !== ''));

    return combineLatest([nonEmptyOrganIri, this.model.position$]).pipe(
      map(([organIri, position]) => {
        const organEntity = this.getOrganSpatialEntity(organIri);
        const blockSize = this.model.snapshot.blockSize;
        const rotation = this.model.snapshot.rotation;
        if (!organEntity) {
          return [];
        }

        return getTissueBlockScene(
          {
            x_dimension: blockSize.x,
            y_dimension: blockSize.y,
            z_dimension: blockSize.z,
          } as SpatialEntity,
          {
            x_translation: position.x - organEntity.x_dimension / 2,
            y_translation: position.y - organEntity.y_dimension / 2,
            z_translation: position.z - organEntity.z_dimension / 2,

            x_rotation: rotation.x,
            y_rotation: rotation.y,
            z_rotation: rotation.z,

            x_scaling: 1,
            y_scaling: 1,
            z_scaling: 1,
          } as SpatialPlacement,
        );
      }),
    );
  }

  /** Placement cube */
  @Computed()
  get placementCube$(): Observable<SpatialSceneNode[]> {
    return combineLatest([
      this.model.viewType$,
      this.model.blockSize$,
      this.model.rotation$,
      this.model.position$,
      this.model.organ$,
    ]).pipe(
      map(([, , , , organ]) => (organ.src === '' ? [] : [this.placementCube])),
      distinctUntilChanged(isEqual),
    );
  }

  /** Placement cube */
  @Computed()
  get placementCube(): SpatialSceneNode {
    const { viewType, blockSize, rotation, position, organDimensions } = this.model.snapshot;
    const dims = [organDimensions.x, organDimensions.y, organDimensions.z].map((n) => -n / 1000 / 2);
    return {
      '@id': '#DraftPlacement',
      '@type': 'SpatialSceneNode',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([position.x, position.y, position.z].map((n, i) => n / 1000 + dims[i]))
        .rotateXYZ([rotation.x, rotation.y, rotation.z].map<number>(toRadians) as [number, number, number])
        .scale([blockSize.x, blockSize.y, blockSize.z].map((n) => n / 1000 / 2)),
      color: [255, 255, 0, 200],
      tooltip: 'Draft Placement',
      unpickable: viewType === '3d',
    };
  }

  /** Rotation */
  @Computed()
  get rotation$(): Observable<number> {
    return this.model.viewSide$.pipe(
      map((side) => {
        let rotation = 0;
        switch (side) {
          case 'left':
            rotation = -90;
            break;
          case 'right':
            rotation = 90;
            break;
          case 'posterior':
            rotation = 180;
            break;
          default:
            break;
        }
        return rotation;
      }),
    );
  }

  /** Mini model gizmo */
  readonly gizmo$: Observable<SpatialSceneNode[]> = of([
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#VHMaleOrgans_VHM_Spleen_Colic_Surface',
      '@type': 'SpatialSceneNode',
      scenegraph: 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/Assets/body4Mesh_1338.glb',
      transformMatrix: new Matrix4(Matrix4.IDENTITY).scale([2, 2, 2]).rotateY(toRadians(0)),
      tooltip: 'Gizmo',
      unpickable: true,
      _lighting: 'pbr',
      zoomBasedOpacity: false,
      color: [255, 255, 255, 255],
      opacity: 1,
    },
  ]);

  /** Defer collisions */
  @Computed()
  get deferCollisions$(): Observable<boolean> {
    return this.state$.pipe(
      map((state) => state.deferCollisions),
      distinctUntilChanged(),
    );
  }

  /** Reference to the model state */
  private model!: ModelState;
  /** Registration state */
  private registration!: RegistrationState;
  /** Reference data state */
  private referenceData!: ReferenceDataState;

  /** Collisions */
  @Computed()
  private get collisions$(): Observable<Collision[] | undefined> {
    const jsonld$ = defer(() => this.registration.throttledJsonld$);
    return combineLatest([this.deferCollisions$, jsonld$]).pipe(
      distinctUntilChanged<[boolean, unknown]>(isEqual),
      concatMap(([deferCollisions, jsonld]) => (deferCollisions ? of([]) : this.getCollisions(jsonld))),
      startWith([]),
    );
  }

  /**
   * Initializes this state service.
   */
  override ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.model = this.injector.get(ModelState);
    this.registration = this.injector.get(RegistrationState);
    this.referenceData = this.injector.get(ReferenceDataState);

    this.placementCube$.subscribe(() => this.setDeferCollisions(false));
  }

  /** Set deferCollisions option */
  @DataAction()
  setDeferCollisions(deferCollisions: boolean): void {
    this.ctx.patchState({ deferCollisions });
  }

  /** Create the scene */
  private createSceneNodes(organIri: string, items: VisibilityItem[]): SpatialSceneNode[] {
    const db = this.referenceData.snapshot;
    return items
      .filter((item) => item.visible && item.opacity && item.opacity > 0)
      .map((item): SpatialSceneNode[] => {
        if (db.sceneNodeLookup[item.id]) {
          return [
            {
              ...(db.sceneNodeLookup[item.id] as SpatialSceneNode),
              opacity: (item.opacity ?? 100) / 100,
              color: [255, 255, 255, 255],
            },
          ];
        }
        return (db.anatomicalStructures[organIri] || [])
          .filter((node) => node.representation_of === item.id)
          .map((node) => ({
            ...(db.sceneNodeLookup[node['@id']] as SpatialSceneNode),
            opacity: (item.opacity ?? 100) / 100,
            color: [255, 255, 255, 255],
          }));
      })
      .reduce((acc, nodes) => acc.concat(nodes), []);
  }

  /** Get the organ spatial entity */
  private getOrganSpatialEntity(organIri: string): SpatialEntity {
    const db = this.referenceData.snapshot;
    return db.organSpatialEntities[organIri] as SpatialEntity;
  }

  /** Get collisions */
  private getCollisions(jsonld: unknown): Observable<Collision[] | undefined> {
    return this.globalConfig.getOption('collisionsEndpoint').pipe(
      switchMap((endpoint) =>
        endpoint
          ? this.http.post<Collision[]>(endpoint, JSON.stringify(jsonld), {
              headers: { 'Content-Type': 'application/json' },
            })
          : of(undefined),
      ),
      catchError(() => of(undefined)),
      take(1),
    );
  }

  /** Filter collisions */
  private filterNodeCollisions(nodes: SpatialSceneNode[], collisions: Collision[]): SpatialSceneNode[] {
    const collidedIds = new Set(collisions.map((node) => node.id));
    return nodes.filter((node) => collidedIds.has(node['@id']));
  }

  /** Filter nodes by a bounding box */
  private filterNodeBBox(nodes: SpatialSceneNode[], placement: SpatialSceneNode): SpatialSceneNode[] {
    const bbox = getNodeBbox(placement);
    return nodes.filter((model) => bbox.overlaps(getNodeBbox(model)));
  }

  /** Get previous nodes */
  private getPreviousRegistrationNodes(
    organIri: string,
    previousRegistrations: SpatialEntityJsonLd[],
  ): SpatialSceneNode[] {
    const toNode = (entity: SpatialEntityJsonLd): SpatialSceneNode | undefined => {
      const p = Array.isArray(entity.placement) ? entity.placement[0] : entity.placement;
      if (p.target === organIri) {
        const organDimensions = this.model.snapshot.organDimensions;
        const dims = [organDimensions.x, organDimensions.y, organDimensions.z].map((n) => -n / 1000 / 2);
        return {
          '@id': entity['@id'],
          '@type': 'SpatialSceneNode',
          transformMatrix: new Matrix4(Matrix4.IDENTITY)
            .translate([p.x_translation, p.y_translation, p.z_translation].map((n, i) => n / 1000 + dims[i]))
            .rotateXYZ([p.x_rotation, p.y_rotation, p.z_rotation].map<number>(toRadians) as [number, number, number])
            .scale([entity.x_dimension, entity.y_dimension, entity.z_dimension].map((n) => n / 1000 / 2)),
          color: [25, 118, 210, 200],
          tooltip: entity.label,
          unpickable: true,
        };
      }
      return undefined;
    };

    return previousRegistrations.map(toNode).filter((entity): entity is SpatialSceneNode => entity !== undefined);
  }
}
