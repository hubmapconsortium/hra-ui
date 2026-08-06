import { AnyRole } from '../schemas/roles.schema';

/** Formatter for abbreviated month and year values in a person's tenure. */
const tenureDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

/** A continuous span of CNS roles. Null means current; undefined means the end is unknown. */
export interface TenureStreak {
  /** First day of the continuous tenure streak. */
  startDate: Date;
  /** Last day of the streak, current, or unknown. */
  endDate: Date | null | undefined;
}

/** Check whether a role explicitly represents a current position. */
export function isCurrentRole(role: AnyRole): boolean {
  return role.dateEnd === null;
}

/** Check whether a role is known to have been active during a given year. */
export function isRoleActiveInYear(role: AnyRole, year: number): boolean {
  const startYear = role.dateStart.getFullYear();
  if (year < startYear) {
    return false;
  } else if (isCurrentRole(role)) {
    return true;
  } else if (role.dateEnd === undefined) {
    return year === startYear;
  }

  return year <= role.dateEnd.getFullYear();
}

/** Check whether the primary role contains profile details beyond the card and email. */
export function hasProfileDetails(roles: readonly AnyRole[]): boolean {
  const role = roles[0];
  if (role?.type !== 'member') {
    return false;
  }

  const { office, phone, fax, education, background, interests } = role;
  return [office, phone, fax, education, background, interests].some((value) => !!value?.trim());
}

/** Derive continuous CNS tenure streaks, ordered from most to least recent. */
export function getTenureStreaks(roles: readonly AnyRole[]): TenureStreak[] {
  const rolesWithKnownEnds = roles
    .filter((role) => role.dateEnd !== undefined)
    .sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
  const unknownEndRoles = roles.filter((role) => role.dateEnd === undefined);
  const streaks: TenureStreak[] = [];
  let currentStreak: TenureStreak | undefined;

  for (const role of rolesWithKnownEnds) {
    const nextStreak: TenureStreak = { startDate: role.dateStart, endDate: role.dateEnd };
    if (!currentStreak) {
      currentStreak = nextStreak;
    } else if (canMergeStreaks(currentStreak, nextStreak)) {
      currentStreak.endDate = mergeEndDates(currentStreak.endDate, nextStreak.endDate);
    } else {
      streaks.push(currentStreak);
      currentStreak = nextStreak;
    }
  }

  if (currentStreak) {
    streaks.push(currentStreak);
  }

  const knownCoverage = streaks.map((streak) => ({ ...streak }));
  for (const role of unknownEndRoles) {
    const overlappingStreakIndex = knownCoverage.findIndex((streak) => containsDate(streak, role.dateStart));
    if (overlappingStreakIndex === -1) {
      streaks.push({ startDate: role.dateStart, endDate: undefined });
    } else if (streaks[overlappingStreakIndex].endDate !== null) {
      streaks[overlappingStreakIndex].endDate = undefined;
    }
  }

  return streaks.sort(compareStreaksByMostRecent);
}

/** Format all continuous CNS tenure streaks from most to least recent. */
export function formatTenureDateRanges(roles: readonly AnyRole[]): string[] {
  return getTenureStreaks(roles).map(({ startDate, endDate }) => {
    const formattedStartDate = tenureDateFormatter.format(startDate);
    if (endDate === null) {
      return `${formattedStartDate}–Current`;
    } else if (endDate === undefined) {
      return `${formattedStartDate}–Unknown`;
    }

    return `${formattedStartDate}–${tenureDateFormatter.format(endDate)}`;
  });
}

/** Check whether two known streaks overlap or meet on consecutive days. */
function canMergeStreaks(current: TenureStreak, next: TenureStreak): boolean {
  if (current.endDate === undefined || next.endDate === undefined) {
    return false;
  } else if (current.endDate === null) {
    return true;
  }

  const dayAfterCurrentEnd = new Date(
    current.endDate.getFullYear(),
    current.endDate.getMonth(),
    current.endDate.getDate() + 1,
  );
  return next.startDate.getTime() <= dayAfterCurrentEnd.getTime();
}

/** Check whether a known tenure streak contains a date. */
function containsDate(streak: TenureStreak, date: Date): boolean {
  return (
    date.getTime() >= streak.startDate.getTime() &&
    (streak.endDate === null || (streak.endDate !== undefined && date.getTime() <= streak.endDate.getTime()))
  );
}

/** Merge two known streak end dates. */
function mergeEndDates(a: Date | null | undefined, b: Date | null | undefined): Date | null | undefined {
  if (a === undefined || b === undefined) {
    return undefined;
  }

  if (a === null || b === null) {
    return null;
  }

  return a.getTime() >= b.getTime() ? a : b;
}

/** Compare streaks by end date, falling back to start date for unknown ends. */
function compareStreaksByMostRecent(a: TenureStreak, b: TenureStreak): number {
  const aEnd = a.endDate === null ? Infinity : (a.endDate?.getTime() ?? a.startDate.getTime());
  const bEnd = b.endDate === null ? Infinity : (b.endDate?.getTime() ?? b.startDate.getTime());
  return bEnd === aEnd ? b.startDate.getTime() - a.startDate.getTime() : bEnd - aEnd;
}
