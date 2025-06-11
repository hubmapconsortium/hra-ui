import { IsActiveMatchOptions } from '@angular/router';

/** Options for active link matching */
export const ACTIVE_MATCH_OPTIONS: IsActiveMatchOptions = {
  paths: 'exact',
  matrixParams: 'ignored',
  queryParams: 'ignored',
  fragment: 'ignored',
};
