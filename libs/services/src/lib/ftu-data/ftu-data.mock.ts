import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iri, Url } from '../shared/common.model';
import { MOCK_TISSUE_DATA } from '../tissue-library/tissue-library.mock';
import { CellSummary, DataFileReference, IllustrationMappingItem, SourceReference } from './ftu-data.model';
import { FtuDataService } from './ftu-data.service';

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
    return of([]);
  }

  /**
  Overrides the getCellSummaries method to return an CellSummary array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an CellSummary array.
  */
  override getCellSummaries(iri: Iri): Observable<CellSummary[]> {
    return of([]);
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
    return of([]);
  }
}
