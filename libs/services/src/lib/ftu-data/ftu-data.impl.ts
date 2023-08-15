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
type Graph<T> = { '@graph': T[] };
type Illustrations = z.infer<typeof ILLUSTRATIONS>;
type Datasets = z.infer<typeof DATASETS>;
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
    return of([]);
  }

  override getCellSummaries(iri: Iri): Observable<CellSummary[]> {
    return of([]);
  }

  override getDataFileReferences(iri: Iri): Observable<DataFileReference[]> {
    return this.fetchData(iri, this.endpoints.illustrations, ILLUSTRATIONS).pipe(
      map((data) => this.findGraphItem(data, iri).illustration_files),
      map((data) => this.toDataFileReferences(data))
    );
  }

  override getSourceReferences(iri: Iri): Observable<SourceReference[]> {
    return this.fetchData(iri, this.endpoints.datasets, DATASETS).pipe(
      map((data) => this.findGraphItem(data, iri).data_sources),
      map((data) => this.toSourceReferences(data))
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
      throw new Error(`Iri not found in data: ${iri}`);
    }

    return item;
  }

  private findIllustrationUrl(files: DataFileReference[]): Url {
    const { fileFormatMapping } = this;
    const svgFormat = fileFormatMapping['image/svg+xml'];
    const ref = files.find(({ format }) => format === svgFormat);
    if (ref === undefined) {
      throw new Error('Illustration url not found');
    }

    return ref.url;
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
