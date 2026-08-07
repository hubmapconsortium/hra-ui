import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { PeopleItem } from '../../schemas/people.schema';

/** Formatter for abbreviated month and year values in a person's tenure. */
const tenureDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

/** A continuous span of former CNS roles. */
interface TenureStreak {
  /** First day of the continuous tenure streak. */
  startDate: Date;
  /** Last day of the continuous tenure streak, when provided by the source data. */
  endDate?: Date;
}

/**
 * Format a person's roles as continuous CNS tenure streaks, newest first.
 * Roles belong to the same streak when their date ranges overlap or meet in the same or next calendar month.
 * Roles with an omitted end date remain visible with an unknown end date, while null-ended current roles are excluded.
 *
 * @param roles Roles used to derive the tenure streaks
 * @returns Formatted tenure ranges ordered from most to least recent
 */
function formatTenureDateRanges(roles: PeopleItem['roles']): string[] {
  const sortedRoles = roles
    .filter((role) => role.dateEnd !== null)
    .map((role): TenureStreak => ({ startDate: role.dateStart, endDate: role.dateEnd ?? undefined }))
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const streaks: TenureStreak[] = [];

  for (const role of sortedRoles) {
    const currentStreak = streaks.at(-1);
    if (!currentStreak || !currentStreak.endDate || !canMergeWithStreak(currentStreak.endDate, role.startDate)) {
      streaks.push(role);
    } else if (!role.endDate) {
      currentStreak.endDate = undefined;
    } else if (role.endDate.getTime() > currentStreak.endDate.getTime()) {
      currentStreak.endDate = role.endDate;
    }
  }

  return streaks
    .reverse()
    .map(
      ({ startDate, endDate }) =>
        `${tenureDateFormatter.format(startDate)}–${endDate ? tenureDateFormatter.format(endDate) : 'Unknown'}`,
    );
}

/**
 * Determine whether a role begins within the month-level continuity window of a streak.
 *
 * @param endDate End date of the existing tenure streak
 * @param nextStart Start date of the next role
 * @returns Whether the role should be merged into the streak
 */
function canMergeWithStreak(endDate: Date, nextStart: Date): boolean {
  const endMonth = endDate.getFullYear() * 12 + endDate.getMonth();
  const nextStartMonth = nextStart.getFullYear() * 12 + nextStart.getMonth();
  return nextStartMonth <= endMonth + 1;
}

/** Card for displaying a former CNS team member and their full CNS tenure. */
@Component({
  selector: 'cns-former-team-member-card',
  imports: [AssetUrlPipe],
  templateUrl: './former-team-member-card.component.html',
  styleUrl: './former-team-member-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormerTeamMemberCardComponent {
  /** Former team member displayed by the card. */
  readonly person = input.required<PeopleItem>();

  /** Team member's most recent CNS occupation or role. */
  readonly occupation = input.required<string>();

  /** Profile image URL, falling back to the gender-neutral placeholder. */
  protected readonly pictureUrl = computed(() => this.person().image || '/assets/placeholder-images/placeholder.png');

  /** Continuous CNS tenure streaks, ordered from most to least recent. */
  protected readonly dateRanges = computed(() => formatTenureDateRanges(this.person().roles));
}
