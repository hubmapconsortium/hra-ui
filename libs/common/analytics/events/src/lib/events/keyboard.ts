import { createEvent, EventCategory } from '../event';

/** Keyboard event properties */
export type KeyboardEventProps = object;

/** Keyboard event */
export default createEvent<KeyboardEventProps>('keyboard', EventCategory.Statistics, 'keydown');
