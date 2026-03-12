import { createEvent, EventCategory } from '../event';

/** Double click event properties */
export type DoubleClickEventProps = object;

/** Double click event */
export default createEvent<DoubleClickEventProps>('doubleClick', EventCategory.Statistics, 'dblclick');
