import {
  AggregateCount,
  DatabaseStatus,
  Filter,
  OntologyTree,
  SpatialEntity,
  SpatialSceneNode,
  TissueBlock,
} from '@hra-api/ng-client';
import { Observable } from 'rxjs';

export interface DataSource {
  getDatabaseStatus(): Observable<DatabaseStatus>;
  getProviderNames(): Observable<string[]>;
  getDatasetTechnologyNames(): Observable<string[]>;
  getOntologyTreeModel(): Observable<OntologyTree>;
  getCellTypeTreeModel(): Observable<OntologyTree>;
  getBiomarkerTreeModel(): Observable<OntologyTree>;
  getReferenceOrgans(): Observable<SpatialEntity[]>;

  getTissueBlockResults(filter?: Filter): Observable<TissueBlock[]>;
  getAggregateResults(filter?: Filter): Observable<AggregateCount[]>;
  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  getScene(filter?: Filter): Observable<SpatialSceneNode[]>;
  getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]>;
}
