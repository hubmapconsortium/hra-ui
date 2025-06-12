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

/** Data source */
export interface DataSource {
  /** Get databse status */
  getDatabaseStatus(): Observable<DatabaseStatus>;
  /** Get provider names */
  getProviderNames(): Observable<string[]>;
  /** Get technologies */
  getDatasetTechnologyNames(): Observable<string[]>;
  /** Get ontology tree */
  getOntologyTreeModel(): Observable<OntologyTree>;
  /** Get cell type tree */
  getCellTypeTreeModel(): Observable<OntologyTree>;
  /** Get biomarker tree */
  getBiomarkerTreeModel(): Observable<OntologyTree>;
  /** Get reference organs */
  getReferenceOrgans(): Observable<SpatialEntity[]>;

  /** Get tissue blocks */
  getTissueBlockResults(filter?: Filter): Observable<TissueBlock[]>;
  /** Get aggregate results */
  getAggregateResults(filter?: Filter): Observable<AggregateCount[]>;
  /** Get ontology term occurences */
  getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  /** Get cell type ocuurences */
  getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  /** Get biomarker occurences */
  getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  /** Get the scene */
  getScene(filter?: Filter): Observable<SpatialSceneNode[]>;
  /** Get the reference organ scene */
  getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]>;
}
