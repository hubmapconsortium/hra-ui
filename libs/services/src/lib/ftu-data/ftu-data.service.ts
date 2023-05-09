import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iri, Url } from '../shared/common.model';
import { CellSummary, DataFileReference, SourceReference } from './ftu-data.model';

/** Service for loading all data related to a single ftu */
@Injectable()
export abstract class FtuDataService {
  abstract getIllustrationUrl(iri: Iri): Observable<Url>;
  abstract getIllustrationMapping(iri: Iri): Observable<void>; // TODO type
  abstract getCellSummaries(iri: Iri): Observable<CellSummary[]>;
  abstract getDataFileReferences(iri: Iri): Observable<DataFileReference[]>;
  abstract getSourceReferences(iri: Iri): Observable<SourceReference[]>;
}
