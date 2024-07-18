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

@Injectable()
export abstract class DataSourceService implements DataSource {
  abstract getDatabaseStatus(): Observable<DatabaseStatus>;
  abstract getProviderNames(): Observable<string[]>;
  abstract getDatasetTechnologyNames(): Observable<string[]>;
  abstract getOntologyTreeModel(): Observable<OntologyTree>;
  abstract getCellTypeTreeModel(): Observable<OntologyTree>;
  abstract getBiomarkerTreeModel(): Observable<OntologyTree>;
  abstract getReferenceOrgans(): Observable<SpatialEntity[]>;

  abstract getTissueBlockResults(filter?: Filter): Observable<TissueBlock[]>;
  abstract getAggregateResults(filter?: Filter): Observable<AggregateCount[]>;
  abstract getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  abstract getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  abstract getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>>;
  abstract getScene(filter?: Filter): Observable<SpatialSceneNode[]>;
  abstract getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]>;
}
