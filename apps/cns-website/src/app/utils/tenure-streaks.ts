import { AnyRole } from '../schemas/roles.schema';

/** Formatter for abbreviated month and year values in a person's tenure. */
const tenureDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

/** Number of milliseconds in a day. */
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Maximum number of days between roles for them to count as one continuous streak. */
const MAX_STREAK_GAP_DAYS = 31;

/**
 * Dates of a role or tenure streak.
 * The end date is null while ongoing and undefined when the source data omits it.
 */
export type DateRange = Pick<AnyRole, 'dateStart' | 'dateEnd'>;

/**
 * Determine whether a role starting on the given date continues a streak.
 * Streaks with an unknown end date are never continued.
 *
 * @param streak Streak to check
 * @param dateStart Start date of the next role
 * @returns Whether the role belongs to the streak
 */
function isStreakContinuation(streak: DateRange, dateStart: Date): boolean {
  if (streak.dateEnd === null) {
    return true;
  } else if (streak.dateEnd === undefined) {
    return false;
  }

  const gapInDays = Math.round((dateStart.getTime() - streak.dateEnd.getTime()) / MS_PER_DAY);
  return gapInDays <= MAX_STREAK_GAP_DAYS;
}

/**
 * Merge roles into continuous tenure streaks.
 * Roles belong to the same streak when they overlap or start within 31 days of the streak's end.
 *
 * @param roles Roles sorted by start date in ascending order
 * @returns Tenure streaks sorted by start date in ascending order
 */
export function mergeStreaks(roles: DateRange[]): DateRange[] {
  const streaks: DateRange[] = [];
  for (const { dateStart, dateEnd } of roles) {
    const streak = streaks.at(-1);
    if (!streak || !isStreakContinuation(streak, dateStart)) {
      streaks.push({ dateStart, dateEnd });
    } else if (streak.dateEnd && (!dateEnd || dateEnd.getTime() > streak.dateEnd.getTime())) {
      // An ongoing or unknown end date replaces a known one
      streak.dateEnd = dateEnd;
    }
  }

  return streaks;
}

/**
 * Format the dates of a role or tenure streak as a month and year range.
 *
 * @param range Dates to format
 * @returns Formatted range, i.e. 'Jan 2020–Dec 2024', 'Jan 2020–Present', or 'Jan 2020–Unknown'
 */
export function formatDateRange({ dateStart, dateEnd }: DateRange): string {
  const start = tenureDateFormatter.format(dateStart);
  if (dateEnd === null) {
    return `${start}–Present`;
  } else if (dateEnd === undefined) {
    return `${start}–Unknown`;
  }

  return `${start}–${tenureDateFormatter.format(dateEnd)}`;
}
