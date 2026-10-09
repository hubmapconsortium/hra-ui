import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AnyRole } from '../../schemas/roles.schema';
import { formatDateRange, mergeStreaks } from '../../utils/tenure-streaks';

/** Ordered list of a person's continuous CNS tenure streaks. */
@Component({
  selector: 'cns-tenure-list',
  templateUrl: './tenure-list.component.html',
  styleUrl: './tenure-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenureListComponent {
  /** Roles used to derive the tenure streaks. */
  readonly roles = input.required<AnyRole[]>();

  /** Formatted tenure streaks, ordered from most to least recent. */
  protected readonly dateRanges = computed(() => {
    const sortedRoles = [...this.roles()].sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
    const streaks = mergeStreaks(sortedRoles);
    return streaks.reverse().map(formatDateRange);
  });
}
