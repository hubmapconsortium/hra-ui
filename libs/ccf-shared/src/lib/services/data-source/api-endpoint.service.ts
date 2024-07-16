import { Injectable } from '@angular/core';
import {
  AggregateCount,
  Filter as ApiFilter,
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
import { Observable, ReplaySubject, Subject, combineLatest, of } from 'rxjs';
import {
  debounceTime,
  delay,
  endWith,
  filter,
  ignoreElements,
  map,
  repeat,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { Cacheable } from 'ts-cacheable';
import { GlobalConfigState } from '../../config/global-config.state';
import { DataSource } from './data-source';

export interface ApiEndpointDataSourceOptions {
  remoteApiEndpoint: string;
  token?: string;
  dataSources?: string[];
  filter?: Filter;
}

// Not exported from ts-cacheable!?
type IObservableCacheConfig = NonNullable<Parameters<typeof Cacheable>[0]>;

type RequestMethod<P, T> = (params: P) => Observable<T>;
type DataReviver<T, U> = (data: T) => U;

interface DefaultParams {
  token?: string;
}

interface FilterParams {
  age?: MinMax;
  ageRange?: string;
  bmi?: MinMax;
  bmiRange?: string;
  ontologyTerms?: string[];
  cellTypeTerms?: string[];
  biomarkerTerms?: string[];
  consortiums?: string[];
  providers?: string[];
  sex?: 'both' | 'female' | 'male';
  technologies?: string[];
  spatial?: SpatialSearch[];
}

// Cache config
const buster$ = new Subject<unknown>();

const CACHE_CONFIG_NO_PARAMS: IObservableCacheConfig = {
  cacheBusterObserver: buster$,
};

const CACHE_CONFIG_PARAMS: IObservableCacheConfig = {
  cacheBusterObserver: buster$,
  maxCacheCount: 4,
};

// Utility
function cast<T>(): (data: unknown) => T {
  return (data) => data as T;
}

function rangeToMinMax(range: number[] | undefined, low: number, high: number): MinMax | undefined {
  return range
    ? { min: range[0] > low ? range[0] : undefined, max: range[1] < high ? range[1] : undefined }
    : undefined;
}

function spatialSceneNodeReviver(nodes: SpatialSceneNode[]): SpatialSceneNode[] {
  return nodes.map((node) => ({
    ...node,
    transformMatrix: new Matrix4(node.transformMatrix ?? []),
  }));
}

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

@Injectable({
  providedIn: 'root',
})
export class ApiEndpointDataSourceService implements DataSource {
  private readonly initialized = new ReplaySubject<void>(1);

  constructor(
    private readonly api: V1Service,
    private readonly globalConfig: GlobalConfigState<ApiEndpointDataSourceOptions>,
  ) {
    this.getSessionToken()
      .pipe(
        tap((token) => globalConfig.patchConfig({ token })),
        tap(buster$),
        debounceTime(1),
      )
      .subscribe(() => {
        if (!this.initialized.closed) {
          this.initialized.next();
          this.initialized.complete();
        }
      });
  }

  getDatabaseStatus(): Observable<DatabaseStatus> {
    return this.doRequest((params) => this.api.dbStatus(params));
  }

  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getProviderNames(): Observable<string[]> {
    return this.doRequest((params) => this.api.providerNames(params));
  }

  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getDatasetTechnologyNames(): Observable<string[]> {
    return this.doRequest((params) => this.api.technologyNames(params));
  }

  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getOntologyTreeModel(): Observable<OntologyTree> {
    return this.doRequest((params) => this.api.ontologyTreeModel(params), undefined, {}, cast<OntologyTree>());
  }

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

  @Cacheable(CACHE_CONFIG_NO_PARAMS)
  getReferenceOrgans(): Observable<SpatialEntity[]> {
    return this.doRequest((params) => this.api.referenceOrgans(params), undefined, {}, cast<SpatialEntity[]>());
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getTissueBlockResults(filter?: Filter): Observable<TissueBlock[]> {
    return this.doRequest((params) => this.api.tissueBlocks(params), filter, {}, cast<TissueBlock[]>());
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getAggregateResults(filter?: Filter): Observable<AggregateCount[]> {
    return this.doRequest((params) => this.api.aggregateResults(params), filter);
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.doRequest((params) => this.api.ontologyTermOccurences(params), filter);
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.doRequest((params) => this.api.cellTypeTermOccurences(params), filter);
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>> {
    return this.doRequest((params) => this.api.biomarkerTermOccurences(params), filter);
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getScene(filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.doRequest((params) => this.api.scene(params), filter, {}, spatialSceneNodeReviver);
  }

  @Cacheable(CACHE_CONFIG_PARAMS)
  getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]> {
    return this.doRequest((params) => this.api.referenceOrganScene(params), filter, { organIri });
  }

  private doRequest<T, P>(
    method: RequestMethod<DefaultParams & FilterParams & P, T>,
    filter?: Filter | undefined,
    params?: P,
  ): Observable<T>;
  private doRequest<T, P, U>(
    method: RequestMethod<DefaultParams & FilterParams & P, T>,
    filter: Filter | undefined,
    params: P | undefined,
    reviver: DataReviver<T, U>,
  ): Observable<U>;
  private doRequest<P>(
    method: RequestMethod<unknown, unknown>,
    filter: Filter | undefined,
    params?: P,
    reviver?: DataReviver<unknown, unknown>,
  ): Observable<unknown> {
    const { api, globalConfig } = this;
    const requestParams: Record<string, unknown> = { ...filterToParams(filter), ...params };

    return combineLatest([
      globalConfig.getOption('remoteApiEndpoint'),
      globalConfig.getOption('token'),
      this.initialized,
    ]).pipe(
      debounceTime(1),
      take(1),
      tap(([endpoint, token]) => {
        api.configuration.basePath = endpoint;
        if (token) {
          requestParams['token'] = token;
        }
      }),
      switchMap(() => method(requestParams)),
      map((data) => (reviver ? reviver(data) : data)),
    );
  }

  private getSessionToken(): Observable<string | undefined> {
    const { globalConfig } = this;
    const dataSources = globalConfig.getOption('dataSources');
    const filter = globalConfig.getOption('filter');
    return combineLatest([dataSources, filter]).pipe(
      debounceTime(50),
      switchMap((args) => this.getSessionTokenImpl(...args)),
      switchMap((token) => this.ensureDatabaseReady(token)),
    );
  }

  private getSessionTokenImpl(
    dataSources: string[] | undefined,
    filter: Filter | undefined,
  ): Observable<string | undefined> {
    if ((dataSources === undefined || dataSources.length === 0) && filter === undefined) {
      return of(undefined);
    }

    const { api, globalConfig } = this;
    const sessionTokenRequest = {
      dataSources: dataSources ?? [],
      filter: filter as ApiFilter,
    };

    return globalConfig.getOption('remoteApiEndpoint').pipe(
      tap((endpoint) => (api.configuration.basePath = endpoint)),
      switchMap(() => api.sessionToken({ sessionTokenRequest })),
      map(({ token }) => token),
    );
  }

  private ensureDatabaseReady(token: string | undefined): Observable<string | undefined> {
    const check = () =>
      this.api.dbStatus({ token }).pipe(
        filter((resp) => resp.status !== 'Ready'),
        switchMap((resp) => of(undefined).pipe(delay(resp.checkback ?? 0))),
      );

    return of(undefined).pipe(repeat({ delay: check }), ignoreElements(), endWith(token));
  }
}
