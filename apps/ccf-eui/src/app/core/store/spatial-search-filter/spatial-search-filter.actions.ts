import { SpatialSearch } from '@hra-api/ng-client';
import type { SpatialSearchFilterItem } from './spatial-search-filter.state';
import { SpatialSearchSex } from '../spatial-search-ui/spatial-search-ui.state';

/**
 * Action to add a spatial search filter
 */
export class AddSearch {
  /** Type of AddSearch */
  static readonly type = '[Spatial Search Filter] Add';

  /**
   * Creates an instance of add search
   * @param sex - The sex for the spatial search
   * @param organName - The name of the organ for the spatial search
   * @param search - The spatial search data object
   */
  constructor(
    readonly sex: SpatialSearchSex,
    readonly organName: string,
    readonly search: SpatialSearch,
  ) {}
}

/**
 * Action to remove a spatial search filter
 */
export class RemoveSearch {
  /** Type of RemoveSearch */
  static readonly type = '[Spatial Search Filter] Remove';

  /**
   * Creates an instance of remove search
   * @param id ID of the spatial search to remove
   */
  constructor(readonly id: string) {}
}

/**
 * Action to set the selected spatial search filters
 */
export class SetSelectedSearches {
  /** Type of SetSelectedSearches */
  static readonly type = '[Spatial Search Filter] Set selected searches';

  /**
   * Creates an instance of set selected searches
   * @param items The array of selected spatial search filter items
   */
  constructor(readonly items: SpatialSearchFilterItem[]) {}
}
