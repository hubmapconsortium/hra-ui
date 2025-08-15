import { createEvent, payload } from '../event';

/** Error event properties */
export interface ErrorEventProps {
  /** An error message */
  message: string;
  /** Contextual data */
  context?: unknown;
  /** Reason for the error (usually an `Error` object) */
  reason?: unknown;
}

/** Error event */
export const Error = createEvent('error', payload<ErrorEventProps>());
