import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/common/url';

/** Card for displaying a former CNS team member and their full CNS tenure. */
@Component({
  selector: 'cns-former-team-member-card',
  imports: [AssetUrlPipe],
  templateUrl: './former-team-member-card.component.html',
  styleUrl: './former-team-member-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormerTeamMemberCardComponent {
  /** Profile image URL. */
  readonly pictureUrl = input.required<string>();

  /** Team member's full name. */
  readonly name = input.required<string>();

  /** Team member's most recent CNS occupation or role. */
  readonly occupation = input.required<string>();

  /** Continuous CNS tenure streaks, ordered from most to least recent. */
  readonly dateRanges = input.required<readonly string[]>();
}
