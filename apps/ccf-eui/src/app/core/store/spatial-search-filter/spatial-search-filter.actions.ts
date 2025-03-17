import { FilterSexEnum, SpatialSearch } from '@hra-api/ng-client';
import type { SpatialSearchFilterItem } from './spatial-search-filter.state';

export class AddSearch {
  static readonly type = '[Spatial Search Filter] Add';

  constructor(
    readonly sex: FilterSexEnum,
    readonly organName: string,
    readonly search: SpatialSearch,
  ) {}
}

export class RemoveSearch {
  static readonly type = '[Spatial Search Filter] Remove';

  constructor(readonly id: string) {}
}

export class SetSelectedSearches {
  static readonly type = '[Spatial Search Filter] Set selected searches';

  constructor(readonly items: SpatialSearchFilterItem[]) {}
}
