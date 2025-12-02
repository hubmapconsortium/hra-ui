import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { RouterExtModule } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CNS_SOCIAL_IDS } from '@hra-ui/design-system/buttons/social-media-button';
import { Menu } from '../types/menus.schema';

/**
 * A menu to be shown when certain header options are clicked
 */
@Component({
  selector: 'cns-mega-menu',
  imports: [HraCommonModule, RouterExtModule, MatIconModule, ButtonsModule, MatDividerModule],
  templateUrl: './mega-menu.component.html',
  styleUrl: './mega-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuComponent {
  /** Menu data to display */
  readonly menu = input.required<Menu>();
  /** Social media button data */
  readonly socials = input(CNS_SOCIAL_IDS);
}
