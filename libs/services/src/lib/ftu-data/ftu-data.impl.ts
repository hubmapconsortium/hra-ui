import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { createLinkId } from '@hra-ui/cdk/state';
import { Observable, firstValueFrom, from, map } from 'rxjs';
import { z } from 'zod';

import { IRI, Iri, URL, Url } from '../shared/common.model';
import {
  CellSummary,
  DataFileReference,
  IllustrationMappingItem,
  SourceReference,
  TissueLibrary,
} from './ftu-data.model';
import { FtuDataService } from './ftu-data.service';

/** Endpoints for Injecting input path */
export interface FtuDataImplEndpoints {
  /** Endpoint for File having Cell illustrations data */
  illustrations: Url;
  /** Endpoint for File having Cell Summaries data */
  summaries: Url;
  /** Endpoint for File having Cell Source References data */
  datasets: Url;
}
/** Constant  to read the endpoints */
export const FTU_DATA_IMPL_ENDPOINTS = new InjectionToken<FtuDataImplEndpoints>('Endpoints');

/** Input to different file formats supported */
export const FTU_DATA_IMPL_FILE_FORMAT_MAPPING = new InjectionToken<Record<string, string>>('Mapping of file formats', {
  providedIn: 'root',
  factory: () => ({
    'image/svg+xml': 'svg',
    'image/png': 'png',
    'application/pdf': 'ai',
  }),
});

type IdItem = z.infer<typeof ID_ITEM>;
type CellSourceItem = z.infer<typeof CELL_SOURCE_ITEM>;
type Graph<T> = { '@graph': T[] };
type Illustrations = z.infer<typeof ILLUSTRATIONS>;
type Datasets = z.infer<typeof DATASETS>;
type Cell_Summary = z.infer<typeof CELL_SUMMARIES>;
type IllusrationFiles = Illustrations['@graph'][number]['illustration_files'];
type dataSources = Datasets['@graph'][number]['data_sources'];

/** Base ID Object */
const ID_ITEM = z.object({
  '@id': IRI,
});

/** ILLUSTRATIONS Object reflecting the format in the file*/
const ILLUSTRATIONS = z.object({
  '@graph': ID_ITEM.extend({
    '@id': IRI,
    label: z.string(),
    organ_id: z.string(),
    organ_label: z.string(),
    representation_of: z.string(),
    illustration_files: z
      .object({
        file: URL,
        file_format: z.string(),
      })
      .array(),
    mapping: z
      .object({
        svg_id: z.string(),
        label: z.string(),
        representation_of: z.string(),
      })
      .array(),
  }).array(),
});

/** DATASETS Object reflecting the format in the file*/
const DATASETS = z.object({
  '@graph': ID_ITEM.extend({
    '@id': IRI,
    data_sources: z
      .object({
        label: z.string(),
        description: z.string(),
        link: z.string(),
      })
      .array(),
  }).array(),
});

/** Base CELL_SOURCE_ITEM Object  having cell_source */
const CELL_SOURCE_ITEM = z.object({
  cell_source: IRI,
});

/** CELL_SUMMARIES zod Object reflecting the format in the file*/
const CELL_SUMMARIES = z.object({
  '@graph': CELL_SOURCE_ITEM.extend({
    cell_source: IRI,
    biomarker_type: z.string(),
    summary: z
      .object({
        cell_id: IRI,
        cell_label: z.string(),
        gene_id: IRI,
        gene_label: z.string(),
        mean_expression: z.number(),
        count: z.number(),
        percentage: z.number(),
        dataset_count: z.number().optional(),
      })
      .array(),
  }).array(),
});

/** Creates clickable link for the tissue tree element */
const TISSUE_LINK = createLinkId('FTU');

/** Provides Base/root url for the tissue tree */
const BASE_IRI = 'https://purl.humanatlas.io/2d-ftu/' as Iri;

/** Capitalizes the first character */
function capitalize(str: string): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
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
  private cache = new Map<Url, Promise<unknown>>();

  /**
  Overrides the getTissueLibrary method to return a data for the tissue Library tree.
  @returns An Observable that emits the tissue Tree data.
  */
  override getTissueLibrary(): Observable<TissueLibrary> {
    return this.fetchData(undefined, this.endpoints.illustrations, ILLUSTRATIONS).pipe(
      map((data) => this.constructTissueLibrary(data['@graph']))
    );
  }

  /**
  Overrides the getIllustrationUrl method to return a mock URL for the given Iri.
  @param iri The Iri of the illustration.
  @returns An Observable that emits the mock URL.
  */
  override getIllustrationUrl(iri: Iri): Observable<Url> {
    return this.getDataFileReferences(iri).pipe(map((data) => this.findIllustrationUrl(data)));
  }

  /**
  Overrides the getIllustrationMapping method to return an IllustrationMappingItem array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an IllustrationMappingItem array.
  */
  override getIllustrationMapping(iri: Iri): Observable<IllustrationMappingItem[]> {
    return this.fetchData(iri, this.endpoints.illustrations, ILLUSTRATIONS).pipe(
      map((data) => this.findGraphItem(data, iri).mapping),
      map((data) => (data ? this.toIllustrationMapping(data) : []))
    );
  }

  /**
  Overrides the getCellSummaries method to return an CellSummary array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an CellSummary array.
  */
  override getCellSummaries(iri: Iri): Observable<CellSummary[]> {
    return this.fetchData(iri, this.endpoints.summaries, CELL_SUMMARIES).pipe(
      map((data) => this.findCellSummaries(data, iri)),
      map((data) => (data ? this.constructCellSummaries(data) : []))
    );
  }

  /**
  Overrides the getDataFileReferences method to return an DataFileReference array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an DataFileReference array.
  */
  override getDataFileReferences(iri: Iri): Observable<DataFileReference[]> {
    return this.fetchData(iri, this.endpoints.illustrations, ILLUSTRATIONS).pipe(
      map((data) => this.findGraphItem(data, iri).illustration_files),
      map((data) => (data ? this.toDataFileReferences(data) : []))
    );
  }

  /**
  Overrides the getSourceReferences method to return an empty array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an empty array.
  */
  override getSourceReferences(iri: Iri): Observable<SourceReference[]> {
    return this.fetchData(iri, this.endpoints.datasets, DATASETS).pipe(
      map((data) => this.findGraphItem(data, iri).data_sources),
      map((data) => (data ? this.toSourceReferences(data) : []))
    );
  }

  /**
   * Fetchs data after reading the file and parses with the requested schema
   * @template T : Schema to be formated
   * @param iri : Tissue iri
   * @param url : File Url
   * @param schema :  Format needed to be extracted
   * @returns data
   */
  private fetchData<T extends z.ZodTypeAny>(iri: Iri | undefined, url: Url, schema: T): Observable<z.infer<T>> {
    const { http, cachedIri, cache } = this;
    if (iri !== undefined && iri !== cachedIri) {
      this.cachedIri = iri;
      this.cache = new Map();
    }
    if (!cache.has(url)) {
      const opts = { params: { id: iri ?? '' }, responseType: 'json' as const };
      const resp = http.get(url, opts).pipe(map((data) => schema.parse(data)));
      cache.set(url, firstValueFrom(resp));
    }
    return from(cache.get(url) as Promise<z.infer<T>>);
  }

  /**
   * Finds object inside the @graph tag for the requested id element
   * @template T
   * @param data
   * @param iri
   * @returns graph item
   */
  private findGraphItem<T extends IdItem>(data: Graph<T>, iri: Iri): T {
    const item = data['@graph'].find(({ '@id': id }) => id === iri);
    if (item === undefined) {
      console.error(`Iri not found in data: ${iri}`);
      return {} as T;
    }

    return item;
  }

  /**
   * Finds cell summaries from fetched Data based on cell_source field
   * @template T
   * @param data
   * @param iri
   * @returns cell summaries
   */
  private findCellSummaries<T extends CellSourceItem>(data: Graph<T>, iri: Iri): T[] {
    const item = data['@graph'].filter(({ cell_source }) => cell_source === iri);
    if (item === undefined || item.length == 0) {
      console.error(`Cell Summary not found in data: ${iri}`);
      return [];
    }
    return item;
  }

  /**
   * Finds illustration url and formates it to Url
   * @param files
   * @returns illustration url
   */
  private findIllustrationUrl(files: DataFileReference[]): Url {
    const { fileFormatMapping } = this;
    const svgFormat = fileFormatMapping['image/svg+xml'];
    const ref = files.find(({ format }) => format === svgFormat);
    if (ref === undefined) {
      console.error('Illustration url not found');
      return '' as Url;
    }
    return ref.url;
  }

  /**
   * To illustration mapping for each tissue open
   * @param mappings
   * @returns illustration mapping
   */
  private toIllustrationMapping(
    mappings: { label: string; svg_id: string; representation_of: string }[]
  ): IllustrationMappingItem[] {
    const ontologyIdPrefix = 'http://purl.obolibrary.org/obo/';
    const results: IllustrationMappingItem[] = [];
    for (const { label, svg_id, representation_of } of mappings) {
      results.push({ label, id: svg_id, ontologyId: representation_of.slice(ontologyIdPrefix.length) });
    }

    return results;
  }

  /**
   * Formates data to array of DataFileReference format
   * @param data
   * @returns data file references
   */
  private toDataFileReferences(data: IllusrationFiles): DataFileReference[] {
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
  private toSourceReferences(data: dataSources): SourceReference[] {
    const results: SourceReference[] = [];
    for (const { label, link, description } of data) {
      results.push({ label, link, title: description });
    }
    return results;
  }

  /**
   * constructCellSummaries : Formates Cell Summary after fetching the data
   * @param data
   * @returns
   */
  private constructCellSummaries(data: Cell_Summary['@graph']): CellSummary[] {
    const cellSummary: CellSummary[] = [];
    const defaultBiomarkerLables = ['gene', 'protein', 'lipid'];
    const biomarkersPresent = new Set(data.map((summary) => summary.biomarker_type.toLowerCase()));
    data.forEach((summaryGroup) => {
      const cells = summaryGroup.summary.map((entry) => ({
        id: entry.cell_id as Iri,
        label: entry.cell_label,
      }));
      const biomarkers = summaryGroup.summary.map((entry) => ({
        id: entry.gene_id as Iri,
        label: entry.gene_label,
      }));
      const summaries = summaryGroup.summary.map((entry) => ({
        cell: entry.cell_id as Iri,
        biomarker: entry.gene_id as Iri,
        count: entry.count,
        percentage: entry.percentage,
        meanExpression: entry.mean_expression,
        dataset_count: entry.dataset_count,
      }));
      cellSummary.push({
        label: `${capitalize(summaryGroup.biomarker_type)} Biomarkers`,
        cells,
        biomarkers,
        summaries,
      });
    });
    defaultBiomarkerLables.forEach((defaultLabel) => {
      if (!biomarkersPresent.has(defaultLabel)) {
        cellSummary.push({
          label: `${capitalize(defaultLabel)} Biomarkers`,
          cells: [],
          biomarkers: [],
          summaries: [],
        });
      }
    });
    return cellSummary;
  }

  /**
   * Constructs tissue library ,forming parent and child nodes
   * @param items
   * @returns
   */
  private constructTissueLibrary(items: Illustrations['@graph']): TissueLibrary {
    const nodes: TissueLibrary['nodes'] = {};
    for (const { '@id': id, label, organ_id, organ_label } of items) {
      const parentId = (BASE_IRI + organ_id) as Iri;
      nodes[parentId] ??= { id: parentId, label: capitalize(organ_label), parent: BASE_IRI, children: [] };
      nodes[id] = { id, label: label, parent: parentId, children: [], link: TISSUE_LINK };
      nodes[parentId]?.children.push(id);
    }
    return { root: BASE_IRI, nodes };
  }
}
