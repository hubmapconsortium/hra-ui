import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { PeopleItem } from '../../schemas/people.schema';
import { TenureListComponent } from '../tenure-list/tenure-list.component';

/** Card for displaying a former CNS team member and their full CNS tenure. */
@Component({
  selector: 'cns-former-team-member-card',
  imports: [AssetUrlPipe, TenureListComponent],
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
}
