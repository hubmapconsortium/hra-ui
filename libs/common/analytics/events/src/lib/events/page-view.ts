import { createEventType, payload } from '../event';

export interface PageViewEventProps {
  // From https://github.com/DavidWells/analytics/blob/analytics%400.8.19/packages/analytics-core/src/modules/page.js#L54
  title: string;
  url: string;
  path: string;
  hash: string;
  search: string;
  width: number;
  height: number;
  referrer?: string;
  // TODO
}

export const PageView = createEventType('pageView', payload<PageViewEventProps>());
