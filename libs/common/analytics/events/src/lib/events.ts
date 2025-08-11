// TODO remove disables
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-empty-object-type */

export enum EventType {
  Click = 'click',
  Hover = 'hover',
  Error = 'error',
  // TODO
}

export type EventPropsMap = {
  [EventType.Click]: ClickEventProps;
  [EventType.Hover]: HoverEventProps;
};

export interface ClickEventProps {
  // TODO
}

export interface HoverEventProps {
  // TODO
}
