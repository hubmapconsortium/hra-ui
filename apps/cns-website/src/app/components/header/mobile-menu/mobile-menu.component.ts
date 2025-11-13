import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { MenuContentComponent } from '../menu-content/menu-content.component';
import { Menus } from '../types/menus.schema';
import { Router, RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SOCIAL_IDS, SocialMediaButtonComponent } from '@hra-ui/design-system/buttons/social-media-button';
import { resolveUrl } from '../../../utils/url-resolver';

/**
 * Display a menu for mobile sized screens
 */
@Component({
  selector: 'cns-mobile-menu',
  imports: [
    HraCommonModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    ScrollingModule,
    MenuContentComponent,
    RouterModule,
    ButtonsModule,
    InlineSVGModule,
    SocialMediaButtonComponent,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {
  readonly menuOptions = input.required<Menus>();
  /** Base url - Menu urls starting with this will be converted into router links */
  readonly baseUrl = input.required<string | undefined>();
  readonly socials = input(SOCIAL_IDS);

  readonly closeMenu = output();

  /** Reference to the router if available */
  private readonly router = inject(Router, { optional: true });

  resolve(url: string, external?: boolean) {
    return resolveUrl(url, external, this.router, this.baseUrl());
  }
}
