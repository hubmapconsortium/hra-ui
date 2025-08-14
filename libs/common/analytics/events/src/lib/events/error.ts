import { createEventType, payload } from '../event';

export interface ErrorEventProps {
  message: string;
  context?: unknown;
  reason?: unknown;
}

export const Error = createEventType('error', payload<ErrorEventProps>());
