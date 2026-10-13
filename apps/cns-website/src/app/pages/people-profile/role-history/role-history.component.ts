import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AnyRole } from '../../../schemas/roles.schema';
import { getRoleTitle } from '../../../utils/role-title';
import { formatDateRange } from '../../../utils/tenure-streaks';

/**
 * Component listing a person's CNS roles with the dates each was held
 */
@Component({
  selector: 'cns-role-history',
  templateUrl: './role-history.component.html',
  styleUrl: './role-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleHistoryComponent {
  /** Roles to list, ordered from most to least recent */
  readonly roles = input.required<AnyRole[]>();

  /** Title, formatted dates, and status of each role */
  protected readonly entries = computed(() =>
    this.roles().map((role) => ({
      title: getRoleTitle(role),
      dateRange: formatDateRange(role),
      ended: role.dateEnd !== null,
    })),
  );
}
