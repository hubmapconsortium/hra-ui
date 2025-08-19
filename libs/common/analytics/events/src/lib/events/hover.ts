import { createEvent, EventCategory } from '../event';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
export interface HoverEventProps {
  // TODO
}

/** Hover event */
export default createEvent<HoverEventProps>('hover', EventCategory.Statistics, 'mouseover');
