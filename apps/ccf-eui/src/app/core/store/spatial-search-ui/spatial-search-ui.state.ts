import { Injectable, inject } from '@angular/core';
import { Filter, FilterSexEnum, SpatialEntity, SpatialSceneNode, SpatialSearch, TissueBlock } from '@hra-api/ng-client';
import { Matrix4 } from '@math.gl/core';
import { Action, Actions, Selector, State, StateContext, Store, ofActionDispatched } from '@ngxs/store';
import { getOriginScene } from 'ccf-scene-utils';
import { DataSourceService, OrganInfo, sexEquals, sexFromString } from 'ccf-shared';
import { Observable, forkJoin } from 'rxjs';
import { debounceTime, mergeMap, take, tap } from 'rxjs/operators';
import { UpdateFilter } from '../data/data.actions';
import { DataStateSelectors } from '../data/data.selectors';
import { SceneState } from '../scene/scene.state';
import { AddSearch } from '../spatial-search-filter/spatial-search-filter.actions';
import { SpatialSearchFilterSelectors } from '../spatial-search-filter/spatial-search-filter.selectors';
import {
  GenerateSpatialSearch,
  MoveToNode,
  ResetPosition,
  ResetRadius,
  SetExecuteSearchOnGenerate,
  SetOrgan,
  SetPosition,
  SetRadius,
  SetSex,
  StartSpatialSearchFlow,
  UpdateSpatialSearch,
} from './spatial-search-ui.actions';

/** Position */
export interface Position {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Z coordinate */
  z: number;
}

/** Radius settings */
export interface RadiusSettings {
  /** Minimum */
  min: number;
  /** Maximum */
  max: number;
  /** Default value */
  defaultValue: number;
}

/** Term result */
export interface TermResult {
  /** Id */
  '@id': string;
  /** Label */
  label: string;
  /** COunt */
  count: number;
}

/** Spatial search state model */
export interface SpatialSearchUiModel {
  /** Sex */
  sex: FilterSexEnum;
  /** Organ id */
  organId?: string;
  /** Block position */
  position?: Position;
  /** Block radius */
  radius?: number;

  /** Default position */
  defaultPosition?: Position;
  /** Radius settings */
  radiusSettings?: RadiusSettings;

  /** Reference organs */
  referenceOrgans?: OrganInfo[];
  /** Scene nodes */
  organScene?: SpatialSceneNode[];

  /** Scene nodes */
  spatialSearchScene?: SpatialSceneNode[];
  /** Tissue blocks */
  tissueBlocks?: TissueBlock[];
  /** Anatomical structures */
  anatomicalStructures?: Record<string, number>;
  /** Cell types */
  cellTypes?: Record<string, number>;

  /** Execute search on generation */
  executeSearchOnGeneration: boolean;
}

/** Update spatial search */
class ReallyUpdateSpatialSearch {
  /** Action type */
  static readonly type = '[SpatialSearchUi] Really update spatial search data';
}

/** Spatial search ui state */
@State<SpatialSearchUiModel>({
  name: 'spatialSearchUi',
  defaults: {
    sex: FilterSexEnum.Female,
    executeSearchOnGeneration: true,
  },
})
@Injectable()
export class SpatialSearchUiState {
  /** Get the organ entity matching the state's organ id */
  @Selector([SpatialSearchUiState, SceneState.referenceOrganEntities])
  static organEntity(state: SpatialSearchUiModel, organs: SpatialEntity[]): SpatialEntity | undefined {
    const { organId, sex } = state;
    return organs.find((o) => o.representation_of === organId && sexEquals(o.sex, sex));
  }

  /** Data service */
  private readonly dataSource = inject(DataSourceService);
  /** State reference */
  private readonly store = inject(Store);

  /** Initialize the state */
  constructor() {
    inject(Actions)
      .pipe(
        ofActionDispatched(UpdateSpatialSearch),
        debounceTime(500),
        tap(() => this.store.dispatch(ReallyUpdateSpatialSearch)),
      )
      .subscribe();
  }

  /** Start a new spatial search */
  @Action(StartSpatialSearchFlow)
  startSpatialSearchFlow(
    ctx: StateContext<SpatialSearchUiModel>,
    { executeSearch }: StartSpatialSearchFlow,
  ): Observable<unknown> {
    const { sex } = ctx.getState();
    return ctx.dispatch([new SetSex(sex), new SetExecuteSearchOnGenerate(executeSearch)]);
  }

  /**
   * Updates sex in the SpatialSearchUI and sets selected organ to undefined if not valid for the sex
   */
  @Action(SetSex)
  setSex(ctx: StateContext<SpatialSearchUiModel>, { sex }: SetSex): Observable<unknown> | void {
    let { organId } = ctx.getState();
    ctx.patchState({ sex });

    if (organId !== undefined && !this.organValidForSex(organId, sex)) {
      organId = undefined;
    }

    const filter = {
      ...this.store.selectSnapshot(DataStateSelectors.filter),
      spatialSearches: [],
    };
    const referenceOrgans = this.store.selectSnapshot(SceneState.referenceOrgans);

    return this.dataSource.getOntologyTermOccurences(filter).pipe(
      take(1),
      tap((counts: Record<string, number>) => {
        ctx.patchState({
          referenceOrgans: referenceOrgans.filter((o) => o.id && !o.disabled && counts[o.id] > 0),
        });
        ctx.dispatch(new SetOrgan(organId));
      }),
    );
  }

  /**
   * Updates organId in the SpatialSearchUI
   */
  @Action(SetOrgan)
  setOrgan(ctx: StateContext<SpatialSearchUiModel>, { organId }: SetOrgan): Observable<unknown> | void {
    ctx.patchState({ organId });

    const organ = this.store.selectSnapshot(SpatialSearchUiState.organEntity);
    if (organ && organId && organ.sex) {
      const { x_dimension: width, y_dimension: height, z_dimension: depth } = organ;
      const position = { x: Math.round(width / 2), y: Math.round(height / 2), z: Math.round(depth / 2) };
      const defaultRadius = Math.round(Math.max(width, height, depth) * 0.07);
      const globalFilter = this.store.selectSnapshot(DataStateSelectors.filter);
      const filter = {
        ...globalFilter,
        sex: sexFromString(organ.sex) ?? globalFilter.sex,
        ontologyTerms: [organId],
        spatialSearches: [],
      };

      return this.dataSource.getReferenceOrganScene(organId, filter).pipe(
        take(1),
        tap((organScene: SpatialSceneNode[]) => {
          ctx.patchState({
            position,
            radius: defaultRadius,
            defaultPosition: position,
            radiusSettings: {
              min: Math.min(defaultRadius, 5),
              max: Math.floor(Math.max(width, height, depth) / 1.5),
              defaultValue: defaultRadius,
            },
            organScene: getOriginScene(organ).concat(organScene),
          });
        }),
        mergeMap(() => ctx.dispatch(new UpdateSpatialSearch())),
      );
    }
  }

  /**
   * Updates position in the SpatialSearchUI
   */
  @Action(SetPosition)
  setPosition(ctx: StateContext<SpatialSearchUiModel>, { position }: SetPosition): void {
    ctx.patchState({ position });
    ctx.dispatch(new UpdateSpatialSearch());
  }

  /** Reset the position */
  @Action(ResetPosition)
  resetPosition(ctx: StateContext<SpatialSearchUiModel>): void {
    const { defaultPosition } = ctx.getState();
    ctx.patchState({ position: defaultPosition });
    ctx.dispatch(new UpdateSpatialSearch());
  }

  /** Move to a node */
  @Action(MoveToNode)
  moveToNode(ctx: StateContext<SpatialSearchUiModel>, { node }: MoveToNode): Observable<unknown> | void {
    const matrix = new Matrix4(node.transformMatrix);
    const [x, y, z] = matrix.getTranslation().map((n) => Math.round(n * 1000));
    const position: Position = { x, y, z };

    return ctx.dispatch(new SetPosition(position));
  }

  /**
   * Updates radius in the SpatialSearchUI
   */
  @Action(SetRadius)
  setRadius(ctx: StateContext<SpatialSearchUiModel>, { radius }: SetRadius): void {
    ctx.patchState({ radius });
    ctx.dispatch(new UpdateSpatialSearch());
  }

  /** Reset radius */
  @Action(ResetRadius)
  resetRadius(ctx: StateContext<SpatialSearchUiModel>): void {
    const { radiusSettings } = ctx.getState();
    const radius = radiusSettings?.defaultValue ?? 0;
    ctx.patchState({ radius });
    ctx.dispatch(new UpdateSpatialSearch());
  }

  /**
   * Updates the spatial search data as the organ, position, and radius changes
   */
  @Action(ReallyUpdateSpatialSearch)
  updateSpatialSearch(ctx: StateContext<SpatialSearchUiModel>): Observable<unknown> | void {
    const { position, radius } = ctx.getState();
    const organ = this.store.selectSnapshot(SpatialSearchUiState.organEntity);
    if (organ && position && radius && organ.representation_of) {
      const db = this.dataSource;
      const organId = organ.representation_of;
      const globalFilter = this.store.selectSnapshot(DataStateSelectors.filter);
      const filter: Filter = {
        ...globalFilter,
        sex: sexFromString(organ.sex ?? '') ?? globalFilter.sex,
        ontologyTerms: [organId],
        spatialSearches: [
          {
            ...position,
            radius: radius,
            target: organ['@id'],
          },
        ],
      };

      return forkJoin({
        spatialSearchScene: db.getReferenceOrganScene(organId, filter).pipe(take(1)),
        tissueBlocks: db.getTissueBlockResults(filter).pipe(take(1)),
        anatomicalStructures: db.getOntologyTermOccurences(filter).pipe(take(1)),
        cellTypes: db.getCellTypeTermOccurences(filter).pipe(take(1)),
      }).pipe(tap((data: Partial<SpatialSearchUiModel>) => ctx.patchState(data)));
    }
  }

  /**
   * Generates and adds a new spatial search then resets the ui state
   */
  @Action(GenerateSpatialSearch)
  generateSpatialSearch(ctx: StateContext<SpatialSearchUiModel>): Observable<unknown> | void {
    const { position, radius, sex, organId, referenceOrgans = [], executeSearchOnGeneration } = ctx.getState();
    const organ = this.store.selectSnapshot(SpatialSearchUiState.organEntity);
    const info = referenceOrgans.find((item) => item.id === organId);

    if (position && radius && organ?.representation_of && info) {
      const search: SpatialSearch = {
        ...position,
        radius,
        target: organ['@id'],
      };
      const actions: unknown[] = [new AddSearch(sex, info.name, search)];

      if (executeSearchOnGeneration) {
        const searches = this.store.selectSnapshot(SpatialSearchFilterSelectors.selectedSearches);
        actions.push(
          new UpdateFilter({
            spatialSearches: searches.concat(search),
          }),
        );
      }

      return ctx.dispatch(actions).pipe(
        tap(() =>
          ctx.patchState({
            sex: FilterSexEnum.Female,
            organId: undefined,
          }),
        ),
      );
    }
  }

  /** Set whether to execute search on registration */
  @Action(SetExecuteSearchOnGenerate)
  setExecuteSearchOnGenerate(ctx: StateContext<SpatialSearchUiModel>, { execute }: SetExecuteSearchOnGenerate): void {
    ctx.patchState({
      executeSearchOnGeneration: execute,
    });
  }

  /**
   * Used to determine if an organ should be listed if a certain sex is selected
   */
  private organValidForSex(organId: string, sex: FilterSexEnum): boolean {
    const organs = this.store.selectSnapshot(SceneState.referenceOrgans);
    const organ = organs.find((o) => o.id === organId);
    return organ?.hasSex || sexEquals(organ?.sex, sex);
  }
}
