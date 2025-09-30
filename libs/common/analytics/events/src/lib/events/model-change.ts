import { createEvent, EventCategory } from '../event';

/** Model change event properties */
export interface ModelChangeEventProps {
  /** Model value */
  value?: unknown;
}

/** Model change event */
export default createEvent<ModelChangeEventProps>('modelChange', EventCategory.Statistics);
