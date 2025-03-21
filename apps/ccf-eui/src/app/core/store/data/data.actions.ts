import { Filter } from '@hra-api/ng-client';

/**
 * Update filter action
 */
export class UpdateFilter {
  /** Update filter type */
  static readonly type = '[DataState] Update filter';

  /**
   * Creates an instance of update filter.
   * @param filter Filter to update
   */
  constructor(readonly filter: Partial<Filter>) {}
}
