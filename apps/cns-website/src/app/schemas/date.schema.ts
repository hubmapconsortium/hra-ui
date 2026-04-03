import * as z from 'zod';

/**
 * Parse input into a Date object.
 * Unlike `new Date()`, this will parse date 'YYYY-MM-DD' formats in the local timezone rather than UTC.
 */
export const LocalDateSchema = z
  .unknown()
  .transform((value) => {
    if (typeof value === 'string') {
      const parts = value.split('-');
      if (parts.length === 3) {
        const [year, month, day] = parts.map(Number);
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          return new Date(year, month - 1, day);
        }
      }
    }

    return value;
  })
  .pipe(z.coerce.date())
  .meta({ id: 'Date' });
