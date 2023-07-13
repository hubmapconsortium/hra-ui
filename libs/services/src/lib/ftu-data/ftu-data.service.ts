import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iri, Url } from '../shared/common.model';
import { CellSummary, DataFileReference, IllustrationMappingItem, SourceReference } from './ftu-data.model';

/** Service for loading all data related to a single ftu */
@Injectable()
export abstract class FtuDataService {
  /**
   * This method takes
   * @param iri and @returns an observable url
   */
  abstract getIllustrationUrl(iri: Iri): Observable<Url>;
  /**
   * This method takes
   * @param iri and @returns observable of IllustrationMappingItem
   */
  abstract getIllustrationMapping(iri: Iri): Observable<IllustrationMappingItem[]>;
  /**
   * Gets the
   * @param iri and
   * @returns observable of cell summaries
   */
  abstract getCellSummaries(iri: Iri): Observable<CellSummary[]>;
  /**
   * Gets the
   * @param iri
   * @returns obeservable of data file references
   */
  abstract getDataFileReferences(iri: Iri): Observable<DataFileReference[]>;
  /**
   * Gets the
   * @param iri
   * @returns obeservable of source references
   */
  abstract getSourceReferences(iri: Iri): Observable<SourceReference[]>;
}
