import { createEventType, payload } from '../event';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
export interface HoverEventProps {
  // TODO
}

export const Hover = createEventType('hover', payload<HoverEventProps>());
