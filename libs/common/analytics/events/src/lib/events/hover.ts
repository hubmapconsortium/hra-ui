import { createEvent, EventCategory } from '../event';

/** Hover event properties */
export type HoverEventProps = object;

/** Hover event */
export default createEvent<HoverEventProps>('hover', EventCategory.Statistics, 'mouseover');
