import { SpatialSearch } from '@hra-api/ng-client';
import { Selector } from '@ngxs/store';
import {
  SpatialSearchFilterItem,
  SpatialSearchFilterModel,
  SpatialSearchFilterState,
} from './spatial-search-filter.state';

/** Search selectors */
export class SpatialSearchFilterSelectors {
  /** Get items */
  @Selector([SpatialSearchFilterState])
  static items(state: SpatialSearchFilterModel): SpatialSearchFilterItem[] {
    return state;
  }

  /** Get searches */
  @Selector([SpatialSearchFilterSelectors.items])
  static searches(items: SpatialSearchFilterItem[]): SpatialSearch[] {
    return items.map((item) => item.search);
  }

  /** Get selected searches */
  @Selector([SpatialSearchFilterSelectors.items])
  static selectedSearches(items: SpatialSearchFilterItem[]): SpatialSearch[] {
    return items.filter((item) => item.selected).map((item) => item.search);
  }
}
