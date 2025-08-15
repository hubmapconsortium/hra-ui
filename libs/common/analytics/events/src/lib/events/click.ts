import { createEvent, payload } from '../event';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
export interface ClickEventProps {
  // TODO
}

/** Click event */
export const Click = createEvent('click', payload<ClickEventProps>());
