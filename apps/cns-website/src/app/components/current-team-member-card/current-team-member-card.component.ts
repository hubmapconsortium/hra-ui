import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { IconsModule } from '@hra-ui/design-system/icons';
import { PeopleItem } from '../../schemas/people.schema';

/** Card for displaying a current CNS team member. */
@Component({
  selector: 'cns-current-team-member-card',
  imports: [ButtonsModule, IconsModule, LinkDirective, ProfileCardComponent],
  templateUrl: './current-team-member-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTeamMemberCardComponent {
  /** Current team member displayed by the card. */
  readonly person = input.required<PeopleItem>();

  /** Team member's current occupation or role. */
  readonly occupation = input.required<string>();

  /** Profile image URL, falling back to the gender-neutral placeholder. */
  protected readonly pictureUrl = computed(() => this.person().image || '/assets/placeholder-images/placeholder.png');

  /** Whether the profile contains useful information beyond the card and email. */
  protected readonly showLearnMore = computed(() => {
    const role = this.person().roles[0];
    if (role?.type !== 'member') {
      return false;
    }

    const { office, phone, fax, education, background, interests } = role;
    return [office, phone, fax, education, background, interests].some((value) => !!value?.trim());
  });
}
