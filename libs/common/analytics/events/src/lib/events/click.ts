import { createEventType, payload } from '../event';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
export interface ClickEventProps {
  // TODO
}

export const Click = createEventType('click', payload<ClickEventProps>());
