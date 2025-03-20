import { inject, Injectable } from '@angular/core';
import {
  AggregateCount,
  DatabaseStatus,
  Filter,
  MinMax,
  OntologyTree,
  SpatialEntity,
  SpatialSceneNode,
  SpatialSearch,
  TissueBlock,
  V1Service,
} from '@hra-api/ng-client';
import { Matrix4 } from '@math.gl/core';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  endWith,
  filter as rxjsFilter,
  ignoreElements,
  map,
  repeat,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { Cacheable } from 'ts-cacheable';
import { GlobalConfigState } from '../../config/global-config.state';
import { DataSource } from './data-source';

/** Api enpoint options */
export interface ApiEndpointDataSourceOptions {
  /** Endpoint url */
  remoteApiEndpoint: string;
  /** Api token */
  token?: string;
  /** Data sources to include */
  dataSources?: string[];
  /** Data filters */
  filter?: Filter;
}

// Not exported from ts-cacheable!?
/** Cachable config */
type IObservableCacheConfig = NonNullable<Parameters<typeof Cacheable>[0]>;

/** Request method callback */
type RequestMethod<P, T> = (params: P) => Observable<T>;
/** Data reviver callback */
type DataReviver<T, U> = (data: T) => U;

/** Default request parameters */
interface DefaultParams {
  /** Api token */
  token?: string;
}

/** Filter parameter */
interface FilterParams {
  /** Age range */
  age?: MinMax;
  /** Bmi range */
  bmi?: MinMax;
  /** Ontology terms */
  ontologyTerms?: string[];
  /** Cell types */
  cellTypeTerms?: string[];
  /** Biomarkers */
  biomarkerTerms?: string[];
  /** Consortiums */
  consortiums?: string[];
  /** Providers */
  providers?: string[];
  /** Donor sex */
  sex?: 'both' | 'female' | 'male';
  /** Technologies */
  technologies?: string[];
  /** Spatial positions */
  spatial?: SpatialSearch[];
}

/** Subject used to flush caches */
const buster$ = new Subject<unknown>();

/** Basic cache config */
const CACHE_CONFIG_NO_PARAMS: IObservableCacheConfig = {
  cacheBusterObserver: buster$,
};

/** Cache config */
const CACHE_CONFIG_PARAMS: IObservableCacheConfig = {
  cacheBusterObserver: buster$,
  maxCacheCount: 4,
};

/**
 * Helper to cast values to a specific type
 *
 * @returns The identity function
 */
function cast<T>(): (data: unknown) => T {
  return (data) => data as T;
}

/**
 * Converts a two element tuple into a MinMax object. Also clamps the range to [`low`, `high`]
 *
 * @param range Range to convert into a MinMax object
 * @param low Minimum value
 * @param high Maximum value
 * @returns A MinMax object
 */
function rangeToMinMax(range: number[] | undefined, low: number, high: number): MinMax | undefined {
  return range
    ? { min: range[0] > low ? range[0] : undefined, max: range[1] < high ? range[1] : undefined }
    : undefined;
}

/**
 * Reviver for spatial scene nodes
 *
 * @param nodes Raw nodes
 * @returns Revived nodes
 */
function spatialSceneNodeReviver(nodes: SpatialSceneNode[]): SpatialSceneNode[] {
  return nodes.map((node) => ({
    ...node,
    transformMatrix: new Matrix4(node.transformMatrix ?? []),
  }));
}

/**
 * Converts a filter into request parameters
 *
 * @param filter Filter object
 * @returns Filter parameters
 */
function filterToParams(filter?: Filter): FilterParams {
  return {
    age: rangeToMinMax(filter?.ageRange, 1, 110),
    bmi: rangeToMinMax(filter?.bmiRange, 13, 83),
    sex: filter?.sex?.toLowerCase() as FilterParams['sex'],
    ontologyTerms: filter?.ontologyTerms,
    cellTypeTerms: filter?.cellTypeTerms,
    biomarkerTerms: filter?.biomarkerTerms,
    consortiums: filter?.consortiums,
    providers: filter?.tmc,
    technologies: filter?.technologies,
    spatial: filter?.spatialSearches,
  };
}

/**
 * Compare endpoint configurations
 *
 * @param x First set of options
 * @param y Second set of options
 * @returns true if the configurations are considered equal
 */
function compareConfig(x: ApiEndpointDataSourceOptions, y: ApiEndpointDataSourceOptions): boolean {
  if (x.remoteApiEndpoint !== y.remoteApiEndpoint || x.token !== y.token) {
    return false;
  } else if (x.token !== undefined) {
    return true;
  }
  // Deep compare?
  return x.filter === y.filter && x.dataSources === y.dataSources;
}

/** Api endpoint data source */
@Injectable({
  providedIn: 'root',
})
export class ApiEndpointDataSourceService implements DataSource {
  /** Api service */
  private readonly api = inject(V1Service);
  /** Global configuration state */
  private readonly globalConfig: GlobalConfigState<ApiEndpointDataSourceOptions> = inject(GlobalConfigState);
  /** Api configuration */
  private readonly config$ = this.globalConfig.config$.pipe(
    map(cast<ApiEndpointDataSourceOptions>()),
    distinctUntilChanged(compareConfig),
    debounceTime(10),
    switchMap((config) => this.getSessionToken(config)),
    tap(() => buster$.next(null)),
    shareReplay(1),
  );

  /** Initializes the service */
  constructor() {
    this.config$.subscribe();
  }

  /**
   * Get the database status
   *
   * @returns An observable of the database status
   */
  getDatabaseStatus(): Observable<DatabaseStatus> {
    return this.doRequest((params) => this.api.dbStatus(params));
  }

  /**
   * Get the supported provider names
   *
   * @returns An observable of provider names
   */
  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getProviderNames(): Observable<string[]> {
    return this.doRequest((params) => this.api.providerNames(params));
  }

  /**
   * Get the supported technologies
   *
   * @returns An observable of technologies
   */
  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getDatasetTechnologyNames(): Observable<string[]> {
    return this.doRequest((params) => this.api.technologyNames(params));
  }

  /**
   * Get the ontology tree
   *
   * @returns An observable of the ontology tree
   */
  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getOntologyTreeModel(): Observable<OntologyTree> {
    return this.doRequest((params) => this.api.ontologyTreeModel(params), undefined, {}, cast<OntologyTree>());
  }

  /**
   * Get the cell types tree
   *
   * @returns An observable of the cell types tree
   */
  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getCellTypeTreeModel(): Observable<OntologyTree> {
    return this.doRequest((params) => this.api.cellTypeTreeModel(params), undefined, {}, cast<OntologyTree>());
  }

  /**
   * Get the biomarker type tree model.
   *
   * @returns An observable emitting the results.
   */
  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getBiomarkerTreeModel(): Observable<OntologyTree> {
    return this.doRequest((params) => this.api.biomarkerTreeModel(params), undefined, {}, cast<OntologyTree>());
  }

  /**
   * Get the supported reference organs
   *
   * @returns An observable of reference organs
   */
  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getReferenceOrgans(): Observable<SpatialEntity[]> {
    return this.doRequest((params) => this.api.referenceOrgans(params), undefined, {}, cast<SpatialEntity[]>());
  }

  /**
   * Get tissue blocks
   *
   * @param filter Data filter
   * @returns An observable of tissue blocks
   */
  @Cacheable(CACHE_CONFIG_PARAMS)
  getTissueBlockResults(filter?: Filter): Observable<TissueBlock[]> {
    return this.doRequest((params) => this.api.tissueBlocks(params), filter, {}, cast<TissueBlock[]>());
  }

  /**
   * Get aggregate counts
   *
   * @param filter Data filter
   * @returns An observable of counts
   */
  @Cacheable(CACHE_CONFIG_PARAMS)
  getAggregateResults(filter?: Filter): Observable<AggregateCount[]> {
    return this.doRequest((params) => this.api.aggregateResults(params), filter);
  }

  /**
   * Get ontology term occurences
   *
   * @param filter Data filter
   * @returns An observable of ontology term occurences
   */
  @Cacheable(CACHE_CONFIG_PARAMS)
  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.doRequest((params) => this.api.ontologyTermOccurences(params), filter);
  }

  /**
   * Get cell type occurences
   *
   * @param filter Data filter
   * @returns An observable of cell type occurences
   */
  @Cacheable(CACHE_CONFIG_PARAMS)
  getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.doRequest((params) => this.api.cellTypeTermOccurences(params), filter);
  }

  /**
   * Get biomarker occurences
   *
   * @param filter Data filter
   * @returns An observable of biomarker occurences
   */
  @Cacheable(CACHE_CONFIG_PARAMS)
  getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.doRequest((params) => this.api.biomarkerTermOccurences(params), filter);
  }

  /**
   * Get scene nodes
   *
   * @param filter Data filter
   * @returns An observable of scene nodes
   */
  @Cacheable(CACHE_CONFIG_PARAMS)
  getScene(filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.doRequest((params) => this.api.scene(params), filter, {}, spatialSceneNodeReviver);
  }

  /**
   * Get reference organ scene nodes
   *
   * @param organIri Organ iri
   * @param filter Data filter
   * @returns An observable of reference organ scene nodes
   */
  @Cacheable(CACHE_CONFIG_PARAMS)
  getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.doRequest((params) => this.api.referenceOrganScene(params), filter, { organIri });
  }

  /**
   * Perform a api request
   *
   * @param method Request method
   * @param filter Data filter
   * @param params Request parameters
   * @returns An observable of the request result
   */
  private doRequest<T, P>(
    method: RequestMethod<DefaultParams & FilterParams & P, T>,
    filter?: Filter | undefined,
    params?: P,
  ): Observable<T>;
  /**
   * Perform a api request
   *
   * @param method Request method
   * @param filter Data filter
   * @param params Request parameters
   * @param reviver Data reviver
   * @returns An observable of the request result
   */
  private doRequest<T, P, U>(
    method: RequestMethod<DefaultParams & FilterParams & P, T>,
    filter: Filter | undefined,
    params: P | undefined,
    reviver: DataReviver<T, U>,
  ): Observable<U>;
  /**
   * Perform a api request
   *
   * @param method Request method
   * @param filter Data filter
   * @param params Request parameters
   * @param reviver Data reviver
   * @returns An observable of the request result
   */
  private doRequest<P>(
    method: RequestMethod<unknown, unknown>,
    filter: Filter | undefined,
    params?: P,
    reviver?: DataReviver<unknown, unknown>,
  ): Observable<unknown> {
    const { api, config$ } = this;
    const requestParams: Record<string, unknown> = { ...filterToParams(filter), ...params };

    return config$.pipe(
      debounceTime(50),
      take(1),
      tap(({ remoteApiEndpoint, token }) => {
        api.configuration.basePath = remoteApiEndpoint;
        if (token) {
          requestParams['token'] = token;
        }
      }),
      switchMap(() => method(requestParams)),
      map((data) => (reviver ? reviver(data) : data)),
    );
  }

  /**
   * Creates a session token and adds it to the config when applicable
   *
   * @param config Api config
   * @returns An observable of config
   */
  private getSessionToken(config: ApiEndpointDataSourceOptions): Observable<ApiEndpointDataSourceOptions> {
    if (config.token) {
      return of(config);
    }

    const { remoteApiEndpoint, dataSources = [], filter } = config;
    if (dataSources.length === 0 && filter === undefined) {
      return of(config);
    }

    const { api } = this;
    const sessionTokenRequest = { dataSources, filter };
    api.configuration.basePath = remoteApiEndpoint;

    return api.sessionToken({ sessionTokenRequest }).pipe(
      switchMap(({ token }) => this.ensureDatabaseReady(token)),
      map((token) => ({ ...config, token })),
    );
  }

  /**
   * Ensures the database is ready for requests
   *
   * @param token Api token
   * @returns An observable that emits once the database is ready
   */
  private ensureDatabaseReady(token: string | undefined): Observable<string | undefined> {
    const check = () =>
      this.api.dbStatus({ token }).pipe(
        rxjsFilter((resp) => resp.status !== 'Ready'),
        switchMap((resp) => of(undefined).pipe(delay(resp.checkback ?? 0))),
      );

    return of(undefined).pipe(repeat({ delay: check }), ignoreElements(), endWith(token));
  }
}
