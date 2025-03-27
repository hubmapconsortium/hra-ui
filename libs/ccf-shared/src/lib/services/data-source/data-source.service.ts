import { Injectable } from '@angular/core';
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
import { DataSource } from './data-source';

/** Data source service */
@Injectable()
export abstract class DataSourceService implements DataSource {
  /** Get databse status */
  abstract getDatabaseStatus(): Observable<DatabaseStatus>;
  /** Get provider names */
  abstract getProviderNames(): Observable<string[]>;
  /** Get technologies */
  abstract getDatasetTechnologyNames(): Observable<string[]>;
  /** Get ontology tree */
  abstract getOntologyTreeModel(): Observable<OntologyTree>;
  /** Get cell type tree */
  abstract getCellTypeTreeModel(): Observable<OntologyTree>;
  /** Get biomarker tree */
  abstract getBiomarkerTreeModel(): Observable<OntologyTree>;
  /** Get reference organs */
  abstract getReferenceOrgans(): Observable<SpatialEntity[]>;

  /** Get tissue blocks */
  abstract getTissueBlockResults(filter?: Filter): Observable<TissueBlock[]>;
  /** Get aggregate results */
  abstract getAggregateResults(filter?: Filter): Observable<AggregateCount[]>;
  /** Get ontology term occurences */
  abstract getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  /** Get cell type ocuurences */
  abstract getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  /** Get biomarker occurences */
  abstract getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  /** Get the scene */
  abstract getScene(filter?: Filter): Observable<SpatialSceneNode[]>;
  /** Get the reference organ scene */
  abstract getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]>;
}
