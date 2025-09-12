import { createEvent, EventCategory } from '../event';

/** Click event properties */
export type ClickEventProps = object;

/** Click event */
export default createEvent<ClickEventProps>('click', EventCategory.Statistics, 'click');
