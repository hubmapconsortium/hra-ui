// TODO remove disables
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-empty-object-type */

export enum EventType {
  PageView = 'pageView',
  Click = 'click',
  Hover = 'hover',
  Error = 'error',
  // TODO
}

// TODO fix unknowns
export type EventPropsMap = {
  [EventType.PageView]: PageViewEventProps;
  [EventType.Click]: ClickEventProps;
  [EventType.Hover]: HoverEventProps;
  [EventType.Error]: ErrorEventProps;
};

export interface CommonEventProps {
  path?: string;
  trigger?: string;
}

export interface PageViewEventProps extends CommonEventProps {
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

export interface ClickEventProps extends CommonEventProps {
  // TODO
}

export interface HoverEventProps extends CommonEventProps {
  // TODO
}

export interface ErrorEventProps extends CommonEventProps {
  message: string;
  context?: unknown;
  reason?: unknown;
}
