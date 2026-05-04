import * as z from 'zod';

/**
 * Parse input into a Date object.
 * Unlike `new Date()`, this will parse date 'YYYY-MM-DD' formats in the local timezone rather than UTC.
 */
export const LocalDateSchema = z
  .union([z.string(), z.number()])
  .transform((value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
      const [year, month, day] = value.split('-').map(Number);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month - 1, day);
      }
    }

    return value;
  })
  .pipe(z.coerce.date())
  .meta({ id: 'Date' });
