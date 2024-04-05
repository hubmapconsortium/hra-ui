import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iri, Url } from '../shared/common.model';
import { MOCK_SUMMARIES } from '../tissue-ftu/tissue-ftu.mock';
import { MOCK_TISSUE_DATA } from '../tissue-library/tissue-library.mock';
import {
  CellSummary,
  DataFileReference,
  IllustrationMappingItem,
  SourceReference,
  TissueLibrary,
} from './ftu-data.model';
import { FtuDataService } from './ftu-data.service';

/**
 * Dummy data for Source References
 */
const sourceReferences: SourceReference[] = [
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: 'Kidney Precision Medicine Project',
    label: 'Ancillary Study Data, Clinical Data, HRT Codebook',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: '[Dataset Owner Title]',
    label: '<Dataset Title + Link to Dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: '[Dataset Owner Title]',
    label: '<Dataset Title + Link to Dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title:
      '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
    label:
      '<Extremely long dataset title that wraps around to the next line as you can see in this example + link to dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: 'Kidney Precision Medicine Project',
    label: 'Ancillary Study Data, Clinical Data, HRT Codebook',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: '[Dataset Owner Title]',
    label: '<Dataset Title + Link to Dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: '[Dataset Owner Title]',
    label: '<Dataset Title + Link to Dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title:
      '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
    label:
      '<Extremely long dataset title that wraps around to the next line as you can see in this example + link to dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
];

/**
 * Dummy data extract om Mock Data of tissue mock
 */
const CELL_SUMMARY_DATA: CellSummary[] = Object.values(MOCK_SUMMARIES).map((summary) => ({
  label: summary.label,
  cellSource: summary.cellSource,
  cells: summary.entries.map((entry) => ({
    id: entry.cell.id as Iri,
    label: entry.cell.label,
    count: entry.count,
  })),
  biomarkers: summary.entries.map((entry) => ({
    id: entry.biomarker.id as Iri,
    label: entry.biomarker.label,
  })),
  summaries: summary.entries.map((entry) => ({
    cell: entry.cell.id as Iri,
    biomarker: entry.biomarker.id as Iri,
    count: entry.count,
    percentage: entry.percentage,
    meanExpression: entry.meanExpression,
  })),
}));

/**
This class represents a mock implementation of the FtuDataService class.
It overrides the methods from the parent class to provide mock data for testing purposes.
*/
@Injectable({
  providedIn: 'root',
})
export class MockFtuDataService extends FtuDataService {
  /**
   * Overrides the getTissueLibrary method to return a mock data for the tissue tree
   * @returns tissue library
   */
  override getTissueLibrary(): Observable<TissueLibrary> {
    return of();
  }
  /**
  Overrides the getIllustrationUrl method to return a mock URL for the given Iri.
  @param iri The Iri of the illustration.
  @returns An Observable that emits the mock URL.
  */
  override getIllustrationUrl(iri: Iri): Observable<Url> {
    return of(MOCK_TISSUE_DATA.nodes[iri].object.file);
  }

  /**
  Overrides the getIllustrationMapping method to return an IllustrationMappingItem array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an IllustrationMappingItem array.
  */
  override getIllustrationMapping(_iri: Iri): Observable<IllustrationMappingItem[]> {
    return of([]);
  }

  /**
  Overrides the getCellSummaries method to return an CellSummary array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an CellSummary array.
  */
  override getCellSummaries(_iri: Iri): Observable<CellSummary[]> {
    return of(CELL_SUMMARY_DATA);
  }
  /**
  Overrides the getDataFileReferences method to return an DataFileReference array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an DataFileReference array.
  */
  override getDataFileReferences(iri: Iri): Observable<DataFileReference[]> {
    return of([
      {
        format: 'svg',
        url: MOCK_TISSUE_DATA.nodes[iri].object.file,
      },
    ]);
  }
  /**
  Overrides the getSourceReferences method to return an empty array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an empty array.
  */
  override getSourceReferences(_iri: Iri): Observable<SourceReference[]> {
    return of(sourceReferences);
  }
}
