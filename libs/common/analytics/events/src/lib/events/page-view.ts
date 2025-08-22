import { createEvent, EventCategory } from '../event';

/**
 * Page view properties
 * Provided by [`analytics`](https://github.com/DavidWells/analytics/blob/analytics%400.8.19/packages/analytics-core/src/modules/page.js#L54)
 */
export interface PageViewEventProps {
  /** Page title */
  title: string;
  /** Page origin */
  url: string;
  /** Current path */
  path: string;
  /** Current hash */
  hash: string;
  /** Current search (query parameters) */
  search: string;
  /** Viewport width at time of event */
  width: number;
  /** Viewport height at time of event */
  height: number;
  /** Referrer page */
  referrer?: string;
}

/** Page view event */
export default createEvent<PageViewEventProps>('pageView', EventCategory.Statistics);
