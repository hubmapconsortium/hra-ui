import { Injectable } from '@angular/core';
import {
  AggregateCount,
  Filter,
  FilterSexEnum,
  SpatialEntity,
  SpatialSceneNode,
  TissueBlock,
} from '@hra-api/ng-client';
import { ALL_POSSIBLE_ORGANS, DataSourceService, OrganInfo } from 'ccf-shared';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrganLookupService {
  private readonly organs = ALL_POSSIBLE_ORGANS;

  constructor(private readonly source: DataSourceService) {}

  getOrganInfo(
    iri: string,
    side?: OrganInfo['side'],
    _sex: Filter['sex'] = FilterSexEnum.Female,
  ): Observable<OrganInfo | undefined> {
    let info = this.organs.find((item) => item.id === iri);
    if (!info) {
      return of(undefined);
    }

    const organ = info.organ;

    if (info.disabled) {
      info = this.organs.find((item) => !item.disabled && item.organ === organ);
    }
    if (info?.side && side && info.side !== side) {
      info = this.organs.find((item) => !item.disabled && item.organ === organ && item.side === side);
    }

    return of(info);
  }

  getOrgan(info: OrganInfo, sex: Filter['sex'] = FilterSexEnum.Both): Observable<SpatialEntity | undefined> {
    return this.source
      .getReferenceOrgans()
      .pipe(
        map((entities) =>
          entities.find((entity) => entity.representation_of === info.id && (sex === 'Both' || entity.sex === sex)),
        ),
      );
  }

  getOrganScene(info: OrganInfo, sex: Filter['sex'] = FilterSexEnum.Female): Observable<SpatialSceneNode[]> {
    if (info.id) {
      const filter: Partial<Filter> = { ontologyTerms: [info.id], sex };
      return this.source.getReferenceOrganScene(info.id, filter as Filter);
    } else {
      return of([]);
    }
  }

  getOrganStats(info: OrganInfo, sex: Filter['sex'] = FilterSexEnum.Female): Observable<AggregateCount[]> {
    if (info.id) {
      const filter: Partial<Filter> = { ontologyTerms: [info.id], sex };
      return this.source.getAggregateResults(filter as Filter);
    } else {
      return of([]);
    }
  }

  getBlocks(info: OrganInfo, sex: Filter['sex'] = FilterSexEnum.Female): Observable<TissueBlock[]> {
    if (info.id) {
      const filter: Partial<Filter> = { ontologyTerms: [info.id], sex };
      return this.source.getTissueBlockResults(filter as Filter);
    } else {
      return of([]);
    }
  }
}
