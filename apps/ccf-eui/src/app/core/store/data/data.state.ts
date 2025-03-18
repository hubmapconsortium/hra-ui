import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { inject, Injectable } from '@angular/core';
import {
  AggregateCount,
  DatabaseStatus,
  Filter,
  FilterSexEnum,
  OntologyTree,
  SpatialSceneNode,
  TissueBlock,
} from '@hra-api/ng-client';
import { Action, NgxsOnInit, State } from '@ngxs/store';
import { DataSourceService } from 'ccf-shared';
import { ObservableInput, ObservedValueOf, OperatorFunction, ReplaySubject, Subject, combineLatest, defer } from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  map,
  publishReplay,
  refCount,
  repeat,
  filter as rxjsFilter,
  switchMap,
  take,
  takeWhile,
  tap,
} from 'rxjs/operators';
import { UpdateFilter } from './data.actions';

/** Default sex */
export const DEFAULT_FILTER_SEX = FilterSexEnum.Both;
/** Default age range minimum */
export const DEFAULT_FILTER_AGE_LOW = 1;
/** Default age range maximum */
export const DEFAULT_FILTER_AGE_HIGH = 110;
/** Default bmi range minimum */
export const DEFAULT_FILTER_BMI_LOW = 13;
/** Default bmi range maximum */
export const DEFAULT_FILTER_BMI_HIGH = 83;

/** Default values for filters. */
export const DEFAULT_FILTER: Required<Filter> = {
  sex: DEFAULT_FILTER_SEX,
  ageRange: [DEFAULT_FILTER_AGE_LOW, DEFAULT_FILTER_AGE_HIGH],
  bmiRange: [DEFAULT_FILTER_BMI_LOW, DEFAULT_FILTER_BMI_HIGH],
  consortiums: [],
  tmc: [],
  technologies: [],
  ontologyTerms: ['http://purl.obolibrary.org/obo/UBERON_0013702'],
  cellTypeTerms: ['http://purl.obolibrary.org/obo/CL_0000000'],
  biomarkerTerms: ['http://purl.org/ccf/biomarkers'],
  spatialSearches: [],
};

/**
 * Tests if a filter is empty. Does not check any of the terms arrays or spatial searches
 *
 * @param filter Filter to test
 * @returns true if it is empty
 */
export function isFilterEmpty(filter: Filter): boolean {
  const {
    sex = DEFAULT_FILTER.sex,
    ageRange: [ageLow, ageHigh] = [],
    bmiRange: [bmiLow, bmiHigh] = [],
    technologies = [],
    consortiums = [],
    tmc = [],
  } = filter;

  return (
    sex === DEFAULT_FILTER_SEX &&
    ageLow === DEFAULT_FILTER_AGE_LOW &&
    ageHigh === DEFAULT_FILTER_AGE_HIGH &&
    bmiLow === DEFAULT_FILTER_BMI_LOW &&
    bmiHigh === DEFAULT_FILTER_BMI_HIGH &&
    technologies.length === 0 &&
    consortiums.length === 0 &&
    tmc.length === 0
  );
}

/**
 * Normalizes a filter applying default values where applicable
 *
 * @param filter Partial filter
 * @returns A full filter object
 */
export function normalizeFilter(filter: Filter): Required<Filter> {
  const result = { ...DEFAULT_FILTER };
  for (const [key, value] of Object.entries(filter)) {
    if (value !== undefined) {
      result[key as keyof Filter] = value;
    }
  }

  return result;
}

/** Current state of data queries. */
// eslint-disable-next-line no-shadow
export enum DataQueryState {
  /** One or more queries are running. */
  Running = 'running',
  /** All queries have completed. */
  Completed = 'completed',
}

/**
 * Helper for testing that all states in an array are `DataQueryState.Completed`.
 *
 * @param states The array of states to test.
 * @returns true if all values in the array is `Completed`.
 */
function allCompleted(states: DataQueryState[]): boolean {
  return states.every((state) => state === DataQueryState.Completed);
}

/**
 * Helper creating a function that sends a `DataQueryState.Completed` to
 * a subject whenever it is called.
 *
 * @param subject The subject to send completed messagess to.
 * @returns The function.
 */
function sendCompletedTo(subject: Subject<DataQueryState>): () => void {
  return () => subject.next(DataQueryState.Completed);
}

/**
 * Helper operator that combines querying with sharing and replay functionality.
 *
 * @param query The data query function.
 * @param [next] An optional listener on the values emitted by the latest query.
 * @returns The combined pipe operator function.
 */
function queryData<T, O extends ObservableInput<unknown>>(
  query: (value: T, index: number) => O,
  next?: (value: ObservedValueOf<O>) => void,
): OperatorFunction<T, ObservedValueOf<O>> {
  return (source) => source.pipe(switchMap(query), tap(next), publishReplay(1), refCount());
}

/** Store data state. */
export interface DataStateModel {
  /** Current filter. */
  filter: Filter;
  /** Database status */
  status: 'Loading' | 'Ready' | 'Error';
  /** AS tree */
  anatomicalStructuresTreeModel?: OntologyTree;
  /** Cell types tree */
  cellTypesTreeModel?: OntologyTree;
  /** Biomarkers tree */
  biomarkersTreeModel?: OntologyTree;
}

/**
 * Data state repository and service.
 */
@StateRepository()
@State<DataStateModel>({
  name: 'data',
  defaults: {
    filter: DEFAULT_FILTER,
    status: 'Loading',
  },
})
@Injectable()
export class DataState extends NgxsDataRepository<DataStateModel> implements NgxsOnInit {
  /** Emits when the database is ready. */
  readonly databaseReady$ = this.state$.pipe(
    map((x) => x?.status),
    distinctUntilChanged(),
    rxjsFilter((status) => status === 'Ready'),
  );

  /** Implementation subject for tissueBlockDataQueryStatus$. */
  private readonly _tissueBlockDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for aggregateDataQueryStatus$. */
  private readonly _aggregateDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for ontologyTermOccurencesDataQueryStatus$. */
  private readonly _ontologyTermOccurencesDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for cellTypeTermOccurencesDataQueryStatus$. */
  private readonly _cellTypeTermOccurencesDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for biomarkerTermOccurencesDataQueryStatus$. */
  private readonly _biomarkerTermOccurencesDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);

  /** Implementation subject for sceneDataQueryStatus$. */
  private readonly _sceneDataQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for technologyFilterQueryStatus$. */
  private readonly _technologyFilterQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Implementation subject for providerFilterQueryStatus$. */
  private readonly _providerFilterQueryStatus$ = new ReplaySubject<DataQueryState>(1);
  /** Keeping track of all ontology terms there is data for. */
  readonly ontologyTermsFullData$ = new ReplaySubject<Record<string, number>>(1);
  /** Keeping track of all cell type terms there is data for. */
  readonly cellTypeTermsFullData$ = new ReplaySubject<Record<string, number>>(1);
  /** Keeping track of all biomarker terms there is data for. */
  readonly biomarkerTermsFullData$ = new ReplaySubject<Record<string, number>>(1);

  /**
   * Queries for tissue block data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  private readonly tissueBlockData = (filter: Filter): ObservableInput<TissueBlock[]> => {
    this._tissueBlockDataQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getTissueBlockResults(filter)));
  };

  /**
   * Queries for aggregate data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  private readonly aggregateData = (filter: Filter): ObservableInput<AggregateCount[]> => {
    this._aggregateDataQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getAggregateResults(filter)));
  };

  /**
   * Queries for ontology term occurences data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  private readonly ontologyTermOccurencesData = (filter: Filter): ObservableInput<Record<string, number>> => {
    this._ontologyTermOccurencesDataQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getOntologyTermOccurences(filter)));
  };

  /**
   * Queries for cell type term occurences data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  private readonly cellTypeTermOccurencesData = (filter: Filter): ObservableInput<Record<string, number>> => {
    this._cellTypeTermOccurencesDataQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getCellTypeTermOccurences(filter)));
  };

  /**
   * Queries for biomarker term occurences data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  private readonly biomarkerTermOccurencesData = (filter: Filter): ObservableInput<Record<string, number>> => {
    this._biomarkerTermOccurencesDataQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getBiomarkerTermOccurences(filter)));
  };

  /**
   * Queries for scene data.
   *
   * @param filter The filter used during query.
   * @returns The result of the query.
   */
  private readonly sceneData = (filter: Filter): ObservableInput<SpatialSceneNode[]> => {
    this._sceneDataQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getScene(filter)));
  };

  /**
   * Queries for technology filter data.
   *
   * @returns The result of the query.
   */
  private readonly technologyFilterData = (): ObservableInput<string[]> => {
    this._technologyFilterQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getDatasetTechnologyNames()));
  };

  /**
   * Queries for provider filter data.
   *
   * @returns The result of the query.
   */
  private readonly providerFilterData = (): ObservableInput<string[]> => {
    this._providerFilterQueryStatus$.next(DataQueryState.Running);
    return this.databaseReady$.pipe(switchMap(() => this.source.getProviderNames()));
  };

  /** Current filter. */
  readonly filter$ = this.state$.pipe(map((x) => x.filter));
  /** Latest tissue block query data. */
  readonly tissueBlockData$ = this.filter$.pipe(
    queryData(this.tissueBlockData, sendCompletedTo(this._tissueBlockDataQueryStatus$)),
  );
  /** Latest aggregate query data. */
  readonly aggregateData$ = this.filter$.pipe(
    queryData(this.aggregateData, sendCompletedTo(this._aggregateDataQueryStatus$)),
  );
  /** Latest ontology term occurences query data. */
  readonly ontologyTermOccurencesData$ = this.filter$.pipe(
    queryData(this.ontologyTermOccurencesData, sendCompletedTo(this._ontologyTermOccurencesDataQueryStatus$)),
  );
  /** Latest ontology term occurences query data. */
  readonly biomarkerTermOccurencesData$ = this.filter$.pipe(
    queryData(this.biomarkerTermOccurencesData, sendCompletedTo(this._biomarkerTermOccurencesDataQueryStatus$)),
  );
  /** Latest cell type term occurences query data. */
  readonly cellTypeTermOccurencesData$ = this.filter$.pipe(
    queryData(this.cellTypeTermOccurencesData, sendCompletedTo(this._cellTypeTermOccurencesDataQueryStatus$)),
  );
  /** Latest scene query data. */
  readonly sceneData$ = this.filter$.pipe(queryData(this.sceneData, sendCompletedTo(this._sceneDataQueryStatus$)));
  /** Latest technology filter label query data. */
  readonly technologyFilterData$ = this.filter$.pipe(
    queryData(this.technologyFilterData, sendCompletedTo(this._technologyFilterQueryStatus$)),
  );
  /** Latest provider filter label query data. */
  readonly providerFilterData$ = this.filter$.pipe(
    queryData(this.providerFilterData, sendCompletedTo(this._providerFilterQueryStatus$)),
  );

  /** Current status of queries in the tissueBlockData$ observable. */
  readonly tissueBlockDataQueryStatus$ = this._tissueBlockDataQueryStatus$.pipe(distinctUntilChanged());
  /** Current status of queries in the aggregateData$ observable. */
  readonly aggregateDataQueryStatus$ = this._aggregateDataQueryStatus$.pipe(distinctUntilChanged());
  /** Current status of queries in the ontologyTermOccurrences$ observable. */
  readonly ontologyTermOccurencesDataQueryStatus$ =
    this._ontologyTermOccurencesDataQueryStatus$.pipe(distinctUntilChanged());
  /** Current status of queries in the cellTypeTermOccurrences$ observable. */
  readonly cellTypeTermOccurencesDataQueryStatus$ =
    this._cellTypeTermOccurencesDataQueryStatus$.pipe(distinctUntilChanged());

  /** Biomarker term occurences */
  readonly biomarkerTermOccurencesDataQueryStatus$ =
    this._biomarkerTermOccurencesDataQueryStatus$.pipe(distinctUntilChanged());
  /** Current status of queries in the sceneData$ observable. */
  readonly sceneDataQueryStatus$ = this._sceneDataQueryStatus$.pipe(distinctUntilChanged());
  /** Current status of queries in the technologyFilter$ observable. */
  readonly technologyFilterQueryStatus$ = this._technologyFilterQueryStatus$.pipe(distinctUntilChanged());
  /** Current status of queries in the providerFilter$ observable. */
  readonly providerFilterQueryStatus$ = this._providerFilterQueryStatus$.pipe(distinctUntilChanged());

  /** Current status of all queries. */
  readonly queryStatus$ = combineLatest([
    this.tissueBlockDataQueryStatus$,
    this.aggregateDataQueryStatus$,
    this.ontologyTermOccurencesDataQueryStatus$,
    this.cellTypeTermOccurencesDataQueryStatus$,
    this.sceneDataQueryStatus$,
    this.technologyFilterQueryStatus$,
    this.providerFilterQueryStatus$,
  ]).pipe(
    map((states) => (allCompleted(states) ? DataQueryState.Completed : DataQueryState.Running)),
    distinctUntilChanged(),
  );

  /** Data source service */
  private readonly source = inject(DataSourceService);

  /**
   * Creates an instance of data state.
   */
  constructor() {
    super();
    // Start everything in the completed state
    this._tissueBlockDataQueryStatus$.next(DataQueryState.Completed);
    this._aggregateDataQueryStatus$.next(DataQueryState.Completed);
    this._ontologyTermOccurencesDataQueryStatus$.next(DataQueryState.Completed);
    this._cellTypeTermOccurencesDataQueryStatus$.next(DataQueryState.Completed);
    this._sceneDataQueryStatus$.next(DataQueryState.Completed);
    this._technologyFilterQueryStatus$.next(DataQueryState.Completed);
    this._providerFilterQueryStatus$.next(DataQueryState.Completed);
  }

  /** Initialize the state */
  override ngxsOnInit(): void {
    const {
      ontologyTermsFullData$,
      ontologyTermOccurencesData$,
      cellTypeTermsFullData$,
      biomarkerTermsFullData$,
      cellTypeTermOccurencesData$,
      biomarkerTermOccurencesData$,
      source,
      snapshot: { filter },
    } = this;

    if (filter === DEFAULT_FILTER) {
      // Common case - Reuse the result of the regular query
      ontologyTermOccurencesData$.pipe(take(1)).subscribe(ontologyTermsFullData$);
      cellTypeTermOccurencesData$.pipe(take(1)).subscribe(cellTypeTermsFullData$);
      biomarkerTermOccurencesData$.pipe(take(1)).subscribe(biomarkerTermsFullData$);
    } else {
      source.getOntologyTermOccurences().pipe(take(1)).subscribe(ontologyTermsFullData$);
      source.getCellTypeTermOccurences().pipe(take(1)).subscribe(cellTypeTermsFullData$);
      source.getBiomarkerTermOccurences().pipe(take(1)).subscribe(biomarkerTermsFullData$);
    }

    this.source
      .getOntologyTreeModel()
      .pipe(take(1))
      .subscribe((model) => this.updateAnatomicalStructuresTreeModel(model));
    this.source
      .getCellTypeTreeModel()
      .pipe(take(1))
      .subscribe((model) => this.updateCellTypesTreeModel(model));
    this.source
      .getBiomarkerTreeModel()
      .pipe(take(1))
      .subscribe((model) => this.updateBiomarkersTreeModel(model));
    this.warmUpDatabase();
  }

  /** Initialize the database */
  private warmUpDatabase(): void {
    defer(() => this.source.getDatabaseStatus())
      .pipe(
        tap((status) => this.updateStatus(status)),
        delay(500),
        take(1),
      )
      .pipe(
        repeat(1000),
        takeWhile((status) => status.status === 'Loading'),
      )
      .subscribe();

    this.databaseReady$
      .pipe(
        take(1),
        tap(() => {
          this.updateStatus({
            status: 'Ready',
          });
        }),
      )
      .subscribe();
  }

  /** Update AS tree */
  @DataAction()
  updateAnatomicalStructuresTreeModel(@Payload('treeModel') model: OntologyTree): void {
    this.ctx.patchState({
      anatomicalStructuresTreeModel: model,
    });
  }

  /** Update cell types tree */
  @DataAction()
  updateCellTypesTreeModel(@Payload('treeModel') model: OntologyTree): void {
    this.ctx.patchState({
      cellTypesTreeModel: model,
    });
  }

  /** Update biomarkers tree */
  @DataAction()
  updateBiomarkersTreeModel(@Payload('treeModel') model: OntologyTree): void {
    this.ctx.patchState({
      biomarkersTreeModel: model,
    });
  }

  /** Update database status */
  @DataAction()
  updateStatus(@Payload('status') status: DatabaseStatus): void {
    this.ctx.patchState({
      status: status.status,
    });
  }

  /**
   * Updates the current filter.
   *
   * @param filter Changes to be made to the current filter.
   */
  @DataAction()
  updateFilter(@Payload('filter') filter: Partial<Filter>): void {
    this.ctx.patchState({
      // Might need to do a deep compare of current and new filter
      filter: { ...this.getState().filter, ...filter },
    });
  }

  /** Update filter */
  @Action(UpdateFilter)
  updateFilterHandler(_ctx: unknown, { filter }: UpdateFilter): void {
    this.updateFilter(filter);
  }
}
