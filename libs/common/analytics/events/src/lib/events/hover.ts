import { createEvent, payload } from '../event';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
export interface HoverEventProps {
  // TODO
}

/** Hover event */
export const Hover = createEvent('hover', payload<HoverEventProps>());
