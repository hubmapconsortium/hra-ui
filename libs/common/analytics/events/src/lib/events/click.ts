import { createEvent, EventCategory } from '../event';

/** Click event properties */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
export interface ClickEventProps {
  // TODO
}

/** Click event */
export default createEvent<ClickEventProps>('click', EventCategory.Statistics, 'click');
