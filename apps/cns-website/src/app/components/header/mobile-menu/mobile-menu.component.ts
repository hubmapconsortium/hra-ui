import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { RouterExtModule } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { SOCIAL_IDS, SocialMediaButtonComponent } from '@hra-ui/design-system/buttons/social-media-button';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MenuContentComponent } from '../menu-content/menu-content.component';
import { Menus } from '../types/menus.schema';

/**
 * Display a menu for mobile sized screens
 */
@Component({
  selector: 'cns-mobile-menu',
  imports: [
    HraCommonModule,
    RouterExtModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    ScrollingModule,
    MenuContentComponent,
    ButtonsModule,
    InlineSVGModule,
    SocialMediaButtonComponent,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {
  /** Options to display on the mobile menu */
  readonly menuOptions = input.required<Menus>();
  /** Social media button data */
  readonly socials = input(SOCIAL_IDS);

  /** Emits when menu is closed */
  readonly closeMenu = output();
}
