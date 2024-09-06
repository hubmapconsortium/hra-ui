import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { createLinkId } from '@hra-ui/cdk/state';
import { firstValueFrom, from, map, Observable, of, shareReplay, switchMap, take, withLatestFrom } from 'rxjs';
import { z } from 'zod';
import { Iri, setUrl, Url } from '../shared/common.model';
import {
  CellSummary,
  DataFileReference,
  IllustrationMappingItem,
  RAW_CELL_SUMMARIES,
  RAW_DATASETS,
  RAW_ILLUSTRATIONS_JSONLD,
  RawDatasets,
  RawIllustrationFile,
  RawIllustrationsJsonld,
  SourceReference,
  TissueLibrary,
} from './ftu-data.model';
import { FtuDataService } from './ftu-data.service';

/** Endpoints for Injecting input path */
export interface FtuDataImplEndpoints {
  /** Endpoint for baseHref */
  baseHref: string;
  /** Endpoint for File having Cell illustrations data */
  illustrations: string | object;
  /** Endpoint for File having Cell Summaries data */
  summaries: string | object;
  /** Endpoint for File having Cell Source References data */
  datasets: string | object;
}
/** Constant  to read the endpoints */
export const FTU_DATA_IMPL_ENDPOINTS = new InjectionToken<Observable<FtuDataImplEndpoints>>('Endpoints');

/** Input to different file formats supported */
export const FTU_DATA_IMPL_FILE_FORMAT_MAPPING = new InjectionToken<Record<string, string>>('Mapping of file formats', {
  providedIn: 'root',
  factory: () => ({
    'image/svg+xml': 'svg',
    'image/png': 'png',
    'application/pdf': 'ai',
  }),
});

type Graph<T> = { '@graph': T[] };
type DataSources = RawDatasets['@graph'][number]['data_sources'];

/** Creates clickable link for the tissue tree element */
const TISSUE_LINK = createLinkId('FTU');

/** Provides Base/root url for the tissue tree */
const BASE_IRI = 'https://purl.humanatlas.io/2d-ftu/' as Iri;

/** Default empty tissue library object */
const EMPTY_TISSUE_LIBRARY: TissueLibrary = {
  root: '' as Iri,
  nodes: {},
};

/** Converts case to title case for organ name */
function titleCase(name: string) {
  return name
    .split(' ')
    .map((l: string) => l[0].toUpperCase() + l.slice(1))
    .join(' ');
}

/**
 * FtuDataImplService - Angular service for handling FTU (Functional Tissue Unit) data operations.
 */
@Injectable({
  providedIn: 'root',
})
export class FtuDataImplService extends FtuDataService {
  /** http client to read files */
  private readonly http = inject(HttpClient);

  /** Endpoints injector to the service */
  private readonly endpoints = inject(FTU_DATA_IMPL_ENDPOINTS);
  /** Endpoint injection for file formats */
  private readonly fileFormatMapping = inject(FTU_DATA_IMPL_FILE_FORMAT_MAPPING);
  /** Stores the last retrived Tissue Iri */
  private cachedIri?: Iri;
  /** Stores the last retrived data for tissue */
  private readonly cache = new Map<Url, Promise<unknown>>();

  /** Setup cache invalidation triggers */
  constructor() {
    super();
    this.endpoints.subscribe(() => this.cache.clear());
  }

  /**
  Overrides the getTissueLibrary method to return a data for the tissue Library tree.
  @returns An Observable that emits the tissue Tree data.
  */
  override getTissueLibrary(): Observable<TissueLibrary> {
    return this.fetchData(undefined, 'illustrations', RAW_ILLUSTRATIONS_JSONLD).pipe(
      map((data) => (data ? this.constructTissueLibrary(data['@graph']) : EMPTY_TISSUE_LIBRARY)),
    );
  }

  /**
  Overrides the getIllustrationUrl method to return a mock URL for the given Iri.
  @param iri The Iri of the illustration.
  @returns An Observable that emits the mock URL.
  */
  override getIllustrationUrl(iri: Iri): Observable<Url | undefined> {
    return this.getDataFileReferences(iri)
      .pipe(map((data) => this.findIllustrationUrl(data)))
      .pipe(
        withLatestFrom(this.endpoints),
        map(([url, { baseHref }]) => url && setUrl(url, baseHref)),
      );
  }

  /**
  Overrides the getIllustrationMapping method to return an IllustrationMappingItem array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an IllustrationMappingItem array.
  */
  override getIllustrationMapping(iri: Iri): Observable<IllustrationMappingItem[]> {
    return this.fetchData(iri, 'illustrations', RAW_ILLUSTRATIONS_JSONLD).pipe(
      map((data) => data && this.findGraphItem(data, iri).mapping),
      map((data) => (data ? this.toIllustrationMapping(data) : [])),
    );
  }

  /**
  Overrides the getCellSummaries method to return an CellSummary array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an CellSummary array.
  */
  override getCellSummaries(iri: Iri): Observable<CellSummary[]> {
    return this.fetchData(iri, 'summaries', RAW_CELL_SUMMARIES).pipe(map((data) => data?.['@graph'] ?? []));
  }

  /**
  Overrides the getDataFileReferences method to return an DataFileReference array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an DataFileReference array.
  */
  override getDataFileReferences(iri: Iri): Observable<DataFileReference[]> {
    return this.fetchData(iri, 'illustrations', RAW_ILLUSTRATIONS_JSONLD).pipe(
      map((data) => data && this.findGraphItem(data, iri).illustration_files),
      map((data) => (data ? this.toDataFileReferences(data) : [])),
    );
  }

  /**
  Overrides the getSourceReferences method to return an empty array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an empty array.
  */
  override getSourceReferences(iri: Iri): Observable<SourceReference[]> {
    return this.fetchData(iri, 'datasets', RAW_DATASETS).pipe(
      map((data) => data && this.findGraphItem(data, iri).data_sources),
      map((data) => (data ? this.toSourceReferences(data) : [])),
    );
  }

  /**
   * Fetchs data after reading the file and parses with the requested schema
   * @template T : Schema to be formated
   * @param iri : Tissue iri
   * @param endpoint : Endpoint name
   * @param schema :  Format needed to be extracted
   * @returns data
   */
  private fetchData<T extends z.ZodTypeAny>(
    iri: Iri | undefined,
    endpoint: keyof FtuDataImplEndpoints,
    schema: T,
  ): Observable<z.infer<T> | undefined> {
    return this.endpoints.pipe(
      switchMap((endpoints) => {
        const source = endpoints[endpoint];
        if (typeof source === 'object') {
          return of(schema.parse(source));
        } else if (source === '') {
          return of(undefined);
        }

        const url = setUrl(source, endpoints.baseHref);
        const { http, cachedIri, cache } = this;
        if (iri !== undefined && iri !== cachedIri) {
          this.cachedIri = iri;
          this.cache.clear();
        }
        if (!cache.has(url)) {
          const opts = { params: { id: iri ?? '' }, responseType: 'json' as const };
          const resp = http.get(url, opts).pipe(map((data) => schema.parse(data)));
          cache.set(url, firstValueFrom(resp));
        }
        return from(cache.get(url) as Promise<z.infer<T>>);
      }),
      take(1),
      shareReplay(1),
    );
  }

  /**
   * Finds object inside the @graph tag for the requested id element
   * @template T
   * @param data
   * @param iri
   * @returns graph item
   */
  private findGraphItem<T extends { '@id': Iri }>(data: Graph<T>, iri: Iri): T {
    const item = data['@graph'].find(({ '@id': id }) => id === iri);
    if (item === undefined) {
      return {} as T;
    }
    return item;
  }

  /**
   * Finds illustration url and formates it to Url
   * @param files
   * @returns illustration url
   */
  private findIllustrationUrl(files: DataFileReference[]): Url | undefined {
    const { fileFormatMapping } = this;
    const svgFormat = fileFormatMapping['image/svg+xml'];
    const ref = files.find(({ format }) => format === svgFormat);
    return ref?.url as Url | undefined;
  }

  /**
   * To illustration mapping for each tissue open
   * @param mappings
   * @returns illustration mapping
   */
  private toIllustrationMapping(
    mappings: { label: string; svg_id: string; svg_group_id: string; representation_of: string }[],
  ): IllustrationMappingItem[] {
    const results: IllustrationMappingItem[] = [];
    for (const source of mappings) {
      const { label, svg_id, svg_group_id, representation_of } = source;
      results.push({
        label,
        id: svg_id,
        groupId: svg_group_id,
        ontologyId: representation_of,
        source,
      });
    }

    return results;
  }

  /**
   * Formates data to array of DataFileReference format
   * @param data
   * @returns data file references
   */
  private toDataFileReferences(data: RawIllustrationFile[]): DataFileReference[] {
    const { fileFormatMapping: formats } = this;
    const results: DataFileReference[] = [];
    for (const { file, file_format } of data) {
      if (file_format in formats) {
        results.push({ format: formats[file_format], url: file });
      }
    }

    return results;
  }

  /**
   * Formats data from 'dataSources' to 'SourceReferences'[] format
   * @param data
   * @returns source references
   */
  private toSourceReferences(data: DataSources): SourceReference[] {
    const results: SourceReference[] = [];
    for (const { '@id': id, label, link, description, authors = [], year = -1, doi = '' } of data) {
      results.push({ id, label, link, title: description, authors, year, doi });
    }
    return results;
  }

  /**
   * Constructs tissue library ,forming parent and child nodes
   * @param items
   * @returns
   */
  private constructTissueLibrary(items: RawIllustrationsJsonld['@graph']): TissueLibrary {
    const nodes: TissueLibrary['nodes'] = {};
    for (const { '@id': id, label, organ_id, organ_label } of items) {
      const parentId = (BASE_IRI + organ_id) as Iri;
      nodes[parentId] ??= { id: parentId, label: titleCase(organ_label), parent: BASE_IRI, children: [] };
      nodes[id] = { id, label: label, parent: parentId, children: [], link: TISSUE_LINK };
      nodes[parentId]?.children.push(id);
    }
    return { root: BASE_IRI, nodes };
  }
}
