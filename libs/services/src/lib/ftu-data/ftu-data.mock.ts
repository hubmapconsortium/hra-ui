import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iri, Url } from '../shared/common.model';
import { MOCK_TISSUE_DATA } from '../tissue-library/tissue-library.mock';
import { CellSummary, DataFileReference, IllustrationMappingItem, SourceReference } from './ftu-data.model';
import { FtuDataService } from './ftu-data.service';
import { MOCK_SUMMARIES } from '../tissue-ftu/tissue-ftu.mock';

const sourceReferences = [
  {
    label: 'Owner Title',
    link: 'google.com',
  },
  {
    label:
      '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
    link: 'google.com',
  },
];

const CELL_SUMMARY_DATA: CellSummary[] = Object.values(MOCK_SUMMARIES).map((summary) => ({
  label: summary.label,
  cells: summary.entries.map((entry) => ({
    id: entry.cell.id as Iri,
    label: entry.cell.label,
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
  })),
}));

const testNode = {
  name: 'Cortical_Collecting_Duct_Principal_Cell_1',
  label: 'kidney cortex collecting duct principal cell',
};
const testMapping = [
  testNode,
  { ...testNode, name: 'Cortical_Collecting_Duct_Principal_Cell_2' },
  { ...testNode, name: 'Cortical_Collecting_Duct_Principal_Cell_3' },
];

/**
This class represents a mock implementation of the FtuDataService class.
It overrides the methods from the parent class to provide mock data for testing purposes.
*/
@Injectable({
  providedIn: 'root',
})
export class MockFtuDataService extends FtuDataService {
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
  override getIllustrationMapping(iri: Iri): Observable<IllustrationMappingItem[]> {
    return of(testMapping);
  }

  /**
  Overrides the getCellSummaries method to return an CellSummary array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an CellSummary array.
  */
  override getCellSummaries(iri: Iri): Observable<CellSummary[]> {
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
  override getSourceReferences(iri: Iri): Observable<SourceReference[]> {
    return of(sourceReferences);
  }
}
