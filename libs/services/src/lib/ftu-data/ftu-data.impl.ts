import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { createLinkId } from '@hra-ui/cdk/state';
import { Observable, firstValueFrom, from, map, of } from 'rxjs';
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

export interface FtuDataImplEndpoints {
  illustrations: Url;
  summaries: Url;
  datasets: Url;
}

export const FTU_DATA_IMPL_ENDPOINTS = new InjectionToken<FtuDataImplEndpoints>('Endpoints');
export const FTU_DATA_IMPL_FILE_FORMAT_MAPPING = new InjectionToken<Record<string, string>>('Mapping of file formats', {
  providedIn: 'root',
  factory: () => ({
    'image/svg+xml': 'svg',
    'image/png': 'png',
    'application/pdf': 'pdf',
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

const ID_ITEM = z.object({
  '@id': IRI,
});

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
    mapping: z.object({
      svg_id: z.string(),
      label: z.string()
    }).array(),
  }).array(),
});

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

const CELL_SOURCE_ITEM = z.object({
  cell_source: IRI,
});

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

const TISSUE_LINK = createLinkId('FTU');
const BASE_IRI = 'https://purl.humanatlas.io/2d-ftu/' as Iri;

@Injectable({
  providedIn: 'root',
})
export class FtuDataImplService extends FtuDataService {
  private readonly http = inject(HttpClient);
  private readonly endpoints = inject(FTU_DATA_IMPL_ENDPOINTS);
  private readonly fileFormatMapping = inject(FTU_DATA_IMPL_FILE_FORMAT_MAPPING);
  private cachedIri?: Iri;
  private cache = new Map<Url, Promise<unknown>>();

  override getTissueLibrary(): Observable<TissueLibrary> {
    return this.fetchData(undefined, this.endpoints.illustrations, ILLUSTRATIONS).pipe(
      map((data) => this.constructTissueLibrary(data['@graph']))
    );
  }

  override getIllustrationUrl(iri: Iri): Observable<Url> {
    return this.getDataFileReferences(iri).pipe(map((data) => this.findIllustrationUrl(data)));
  }

  override getIllustrationMapping(iri: Iri): Observable<IllustrationMappingItem[]> {
    return this.fetchData(iri, this.endpoints.illustrations, ILLUSTRATIONS).pipe(
      map((data) => this.findGraphItem(data, iri).mapping),
      map((data) => (data ? this.toIllustrationMapping(data) : []))
    );

  }

  override getCellSummaries(iri: Iri): Observable<CellSummary[]> {
    return this.fetchData(iri, this.endpoints.summaries, CELL_SUMMARIES).pipe(
      map((data) => this.findCellSummaries(data, iri)),
      map((data) => (data ? this.constructCellSummaries(data) : []))
    );
  }

  override getDataFileReferences(iri: Iri): Observable<DataFileReference[]> {
    return this.fetchData(iri, this.endpoints.illustrations, ILLUSTRATIONS).pipe(
      map((data) => this.findGraphItem(data, iri).illustration_files),
      map((data) => (data ? this.toDataFileReferences(data) : []))
    );
  }

  override getSourceReferences(iri: Iri): Observable<SourceReference[]> {
    return this.fetchData(iri, this.endpoints.datasets, DATASETS).pipe(
      map((data) => this.findGraphItem(data, iri).data_sources),
      map((data) => (data ? this.toSourceReferences(data) : []))
    );
  }

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

  private findGraphItem<T extends IdItem>(data: Graph<T>, iri: Iri): T {
    const item = data['@graph'].find(({ '@id': id }) => id === iri);
    if (item === undefined) {
      console.error(`Iri not found in data: ${iri}`);
      return {} as T;
    }

    return item;
  }

  private findCellSummaries<T extends CellSourceItem>(data: Graph<T>, iri: Iri): T[] {
    const item = data['@graph'].filter(({ cell_source }) => cell_source === iri);
    if (item === undefined || item.length == 0) {
      console.error(`Cell Summary not found in data: ${iri}`);
      return [];
    }
    return item;
  }

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

  private toIllustrationMapping(mappings: {label:string,svg_id:string}[]): IllustrationMappingItem[] {
    const results: IllustrationMappingItem[] = [];
    for (const { label, svg_id } of mappings) {
      results.push({ label,id:svg_id });
    }

    return results;
  }

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

  private toSourceReferences(data: dataSources): SourceReference[] {
    const results: SourceReference[] = [];
    for (const { label, link, description } of data) {
      results.push({ label, link, title: description });
    }
    return results;
  }

  private constructCellSummaries(data: Cell_Summary['@graph']): CellSummary[] {
    const cellSummary: CellSummary[] = [];

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
        label: summaryGroup.biomarker_type,
        cells,
        biomarkers,
        summaries,
      });
    });
    return cellSummary;
  }

  private constructTissueLibrary(items: Illustrations['@graph']): TissueLibrary {
    const nodes: TissueLibrary['nodes'] = {};
    for (const { '@id': id, label, organ_id, organ_label } of items) {
      const parentId = (BASE_IRI + organ_id) as Iri;
      nodes[parentId] ??= { id: parentId, label: organ_label, parent: BASE_IRI, children: [] };
      nodes[id] = { id, label, parent: parentId, children: [], link: TISSUE_LINK };
      nodes[parentId]?.children.push(id);
    }
    return { root: BASE_IRI, nodes };
  }
}
