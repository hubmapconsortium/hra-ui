import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { MenuContentComponent } from '../menu-content/menu-content.component';
import { Menus } from '../types/menus.schema';
import { Router, RouterModule, UrlTree } from '@angular/router';
import { isAbsolute as isAbsoluteUrl } from '@hra-ui/common/url';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SOCIAL_IDS, SocialMediaButtonComponent } from '@hra-ui/design-system/buttons/social-media-button';

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

  /**
   * Resolves an url against the baseUrl
   *
   * @param url Raw url
   * @returns Whether the url is absolute along with the resolved url
   */
  resolveUrl(url: string, forceExternal = false): { isAbsolute: boolean; value: string | UrlTree } {
    const { router } = this;
    const baseUrl = Location.stripTrailingSlash(this.baseUrl() ?? '') + '/';
    let isAbsolute = forceExternal || isAbsoluteUrl(url);
    if (!forceExternal && baseUrl && url.startsWith(baseUrl)) {
      isAbsolute = false;
      url = url.slice(baseUrl.length);
    }

    let value: string | UrlTree = url;
    if (!isAbsolute && router) {
      value = router.parseUrl(Location.stripTrailingSlash(url));
    }

    return { isAbsolute, value };
  }
}
