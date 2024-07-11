import { SpatialSceneNode } from '@hra-api/ng-client';
import {
  AggregateResult,
  DatabaseStatus,
  Filter,
  OntologyTreeModel,
  SpatialEntity,
  TissueBlockResult,
} from 'ccf-database';
import { Observable } from 'rxjs';

export interface DataSource {
  getDatabaseStatus(): Observable<DatabaseStatus>;
  getProviderNames(): Observable<string[]>;
  getDatasetTechnologyNames(): Observable<string[]>;
  getOntologyTreeModel(): Observable<OntologyTreeModel>;
  getCellTypeTreeModel(): Observable<OntologyTreeModel>;
  getBiomarkerTreeModel(): Observable<OntologyTreeModel>;
  getReferenceOrgans(): Observable<SpatialEntity[]>;

  getTissueBlockResults(filter?: Filter): Observable<TissueBlockResult[]>;
  getAggregateResults(filter?: Filter): Observable<AggregateResult[]>;
  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  getScene(filter?: Filter): Observable<SpatialSceneNode[]>;
  getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]>;
}
