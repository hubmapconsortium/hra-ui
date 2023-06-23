import { Observable } from 'rxjs';
import { Iri, Url } from '../shared/common.model';
import { CellSummary, DataFileReference, IllustrationMappingItem, SourceReference } from './ftu-data.model';
import { FtuDataService } from './ftu-data.service';

export class MockFtuDataService extends FtuDataService {
  override getIllustrationUrl(iri: Iri): Observable<Url> {
    throw new Error('Method not implemented.');
  }

  override getIllustrationMapping(iri: Iri): Observable<IllustrationMappingItem[]> {
    throw new Error('Method not implemented.');
  }

  override getCellSummaries(iri: Iri): Observable<CellSummary[]> {
    throw new Error('Method not implemented.');
  }

  override getDataFileReferences(iri: Iri): Observable<DataFileReference[]> {
    throw new Error('Method not implemented.');
  }

  override getSourceReferences(iri: Iri): Observable<SourceReference[]> {
    throw new Error('Method not implemented.');
  }
}
