import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable, Injector } from '@angular/core';
import { SpatialEntity, SpatialSceneNode } from '@hra-api/ng-client';
import { NgxsOnInit, Selector, State } from '@ngxs/store';
import { NodeClickEvent } from 'ccf-body-ui';
import { ALL_POSSIBLE_ORGANS, DataSourceService, OrganInfo } from 'ccf-shared';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, take, tap } from 'rxjs/operators';
import { ColorAssignmentState } from '../color-assignment/color-assignment.state';
import { DataState } from '../data/data.state';
import { ListResultsState } from '../list-results/list-results.state';

/** Default organs selected by the EUI */
export const DEFAULT_SELECTED_ORGANS = new Set([
  'http://purl.obolibrary.org/obo/UBERON_0002097',
  'http://purl.obolibrary.org/obo/UBERON_0004538',
  'http://purl.obolibrary.org/obo/UBERON_0004539',
  'http://purl.obolibrary.org/obo/UBERON_0000948',
  'http://purl.obolibrary.org/obo/UBERON_0002113',
  'http://purl.obolibrary.org/obo/UBERON_0002106',
]);

/**
 * Scene state model
 */
export interface SceneStateModel {
  /** List of spatial scene nodes in the scene */
  scene: SpatialSceneNode[];
  /** List of reference organs */
  referenceOrgans: OrganInfo[];
  /** List of reference organ spatial entities */
  referenceOrganEntities: SpatialEntity[];
  /** List of selected reference organs */
  selectedReferenceOrgans: OrganInfo[];
  /** List of selected anatomical structures */
  selectedAnatomicalStructures: unknown[];
  /** Current highlighted node id */
  highlightedId?: string;
}

/**
 * 3d Scene state
 */
@StateRepository()
@State<SceneStateModel>({
  name: 'scene',
  defaults: {
    scene: [],
    referenceOrgans: [],
    referenceOrganEntities: [],
    selectedReferenceOrgans: [],
    selectedAnatomicalStructures: [],
  },
})
@Injectable()
export class SceneState extends NgxsImmutableDataRepository<SceneStateModel> implements NgxsOnInit {
  /** Returns reference organs in the state */
  @Selector()
  static referenceOrgans(state: SceneStateModel): OrganInfo[] {
    return state.referenceOrgans;
  }

  /** Returns reference organ entities in the state */
  @Selector()
  static referenceOrganEntities(state: SceneStateModel): SpatialEntity[] {
    return state.referenceOrganEntities;
  }

  /** Available Reference Organs */
  readonly referenceOrgans$ = this.state$.pipe(
    map((x) => x?.referenceOrgans),
    distinctUntilChanged(),
  );

  /** Selected Reference Organs */
  readonly selectedReferenceOrgans$ = this.state$.pipe(
    map((x) => x?.selectedReferenceOrgans),
    distinctUntilChanged(),
  );

  /** Scene to display in the 3d Scene */
  readonly scene$ = this.state$.pipe(
    map((x) => x?.scene),
    distinctUntilChanged(),
  );

  /**
   * Observable stream of the highlighted node id
   */
  readonly highlightedId$ = this.state$.pipe(
    map((x) => x?.highlightedId),
    distinctUntilChanged(),
  );

  /** The data state */
  private dataState!: DataState;

  /** Color assignments state */
  private colorAssignments!: ColorAssignmentState;

  /** The list results state */
  private listResults!: ListResultsState;

  /**
   * Creates an instance of scene state.
   * @param dataService Data source service used to fetch reference organs
   * @param injector Injector service used to lazy load data state
   */
  constructor(
    private readonly dataService: DataSourceService,
    private readonly injector: Injector,
  ) {
    super();
  }

  /**
   * Sets the selected reference organs
   *
   * @param referenceOrgans The selected reference organs selected
   */
  @DataAction()
  setSelectedReferenceOrgans(@Payload('selectedReferenceOrgans') selectedReferenceOrgans: OrganInfo[]): void {
    this.ctx.patchState({ selectedReferenceOrgans });
  }

  /**
   * Sets the reference organs
   *
   * @param referenceOrgans The reference organs available
   */
  @DataAction()
  setReferenceOrgans(@Payload('referenceOrgans') referenceOrgans: OrganInfo[]): void {
    this.ctx.patchState({ referenceOrgans });
  }

  /**
   * Sets the reference organ entities
   *
   * @param referenceOrganEntities The reference organ entities available
   */
  @DataAction()
  setReferenceOrganEntities(@Payload('referenceOrganEntities') referenceOrganEntities: SpatialEntity[]): void {
    this.ctx.patchState({ referenceOrganEntities });
  }

  /**
   * Sets the scene
   *
   * @param scene The active scene to display
   */
  @DataAction()
  setScene(@Payload('scene') scene: SpatialSceneNode[]): void {
    this.ctx.patchState({ scene });
  }

  /**
   * Handle scene node clicks
   *
   * @param param0 scene node click event
   */
  sceneNodeClicked({ node, ctrlClick }: NodeClickEvent): void {
    if (
      node.representation_of &&
      node['@id'] !== 'http://purl.org/ccf/latest/ccf.owl#VHFSkin' &&
      node.entityId // Disables this path. Need to update logic here.
    ) {
      this.dataState.updateFilter({ ontologyTerms: [node.representation_of] });
    } else if (node.entityId) {
      this.colorAssignments.assignColor(node['@id'], !ctrlClick);
    }
  }

  /**
   * Highlights list result on scene node hover
   * @param node
   */
  sceneNodeHovered(node: SpatialSceneNode): void {
    this.listResults.highlightNode(node['@id']);
  }

  /**
   * Unhighlights list result on scene node unhover
   */
  sceneNodeUnhover(): void {
    this.listResults.unHighlightNode();
  }

  /**
   * Sets selected reference organs with defaults
   * @param organs
   * @param selected
   */
  setSelectedReferenceOrgansWithDefaults(organs: OrganInfo[], selected: string[]) {
    const selectedSet = new Set(selected?.length ? selected : DEFAULT_SELECTED_ORGANS);
    const filteredOrgans = organs.filter(({ id }) => selectedSet.has(id as string));
    this.setSelectedReferenceOrgans(filteredOrgans);
  }

  /**
   * Sets default organs
   */
  setDefaultOrgans() {
    const defaults = ALL_POSSIBLE_ORGANS.filter(
      ({ id, disabled }) => !disabled && new Set(DEFAULT_SELECTED_ORGANS).has(id as string),
    );
    this.setSelectedReferenceOrgans(defaults);
  }

  /**
   * Initializes this state service.
   */
  override ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.dataState = this.injector.get(DataState);
    this.colorAssignments = this.injector.get(ColorAssignmentState);
    this.listResults = this.injector.get(ListResultsState);
    // Initialize reference organ info
    this.dataService
      .getReferenceOrgans()
      .pipe(
        tap((refOrgans) => this.setReferenceOrganEntities(refOrgans)),
        map((refOrgans) => {
          const organIds = new Set(refOrgans.map((o) => o.representation_of));
          return ALL_POSSIBLE_ORGANS.filter((organ) => organIds.has(organ.id)).map((organ) => ({
            ...organ,
            disabled: false,
            numResults: 0,
          }));
        }),
        take(1),
        tap((organs: OrganInfo[]) => this.setReferenceOrgans(organs)),
      )
      .subscribe();

    // Update scene as the overall state changes
    combineLatest([
      this.dataState.sceneData$,
      this.selectedReferenceOrgans$,
      this.colorAssignments.colorAssignments$,
      this.dataService.getReferenceOrgans(),
      this.listResults.highlightedNodeId$,
    ])
      .pipe(
        map(([scene, selectedOrgans, colors, refOrganData, highlightedNodeId]) => {
          const activeOrgans = new Set(selectedOrgans.map((o) => o.id));
          const refOrgans = new Set(
            refOrganData.filter((o) => activeOrgans.has(o.representation_of)).map((o) => o['@id']),
          );
          return scene
            .filter(
              (node) =>
                node.ccf_annotations?.some?.((tag) => activeOrgans.has(tag)) ??
                (node.reference_organ && refOrgans.has(node.reference_organ)),
            )
            .map(
              (node): SpatialSceneNode =>
                node.entityId &&
                (Object.prototype.hasOwnProperty.call(colors, node['@id']) || highlightedNodeId === node['@id'])
                  ? {
                      ...node,
                      color:
                        highlightedNodeId === node['@id']
                          ? [30, 136, 229, 255]
                          : (colors[node['@id']].rgba as [number, number, number, number]),
                    }
                  : node,
            );
        }),
        tap((scene) => this.setScene(scene)),
      )
      .subscribe();
  }
}
