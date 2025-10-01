import { EventCategory } from '@hra-ui/common/analytics/events';
import * as z from 'zod';

/** Analytics input type without json preprocessing */
const BaseAnalyticsInput = z.union([
  z.undefined(),
  z.boolean(),
  z.stringbool({ truthy: ['true', 'enable', 'enabled'], falsy: ['false', 'disable', 'disabled'] }),
  z.partialRecord(z.enum(EventCategory), z.boolean()),
]);

/** Analytics input type */
export const AnalyticsInput = z
  .preprocess((value) => {
    try {
      if (typeof value === 'string') {
        return JSON.parse(value);
      }
    } catch {
      // Intentionally empty
    }

    return value;
  }, BaseAnalyticsInput)
  .catch(undefined);
