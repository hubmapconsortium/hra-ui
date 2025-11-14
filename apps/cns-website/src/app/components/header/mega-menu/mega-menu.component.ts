import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SOCIAL_IDS } from '@hra-ui/design-system/buttons/social-media-button';
import { Menu } from '../types/menus.schema';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { resolveUrl } from '../../../utils/url-resolver';

/**
 * A menu to be shown when certain header options are clicked
 */
@Component({
  selector: 'cns-mega-menu',
  imports: [HraCommonModule, RouterModule, MatIconModule, ButtonsModule, MatDividerModule],
  templateUrl: './mega-menu.component.html',
  styleUrl: './mega-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuComponent {
  /** Menu data to display */
  readonly menu = input.required<Menu>();
  /** Base url - Menu urls starting with this will be converted into router links */
  readonly baseUrl = input.required<string | undefined>();
  /** Social media button data */
  readonly socials = input(SOCIAL_IDS);

  /** Reference to the router if available */
  private readonly router = inject(Router, { optional: true });

  /** Resolves a url */
  resolve(url: string, external?: boolean) {
    return resolveUrl(url, external, this.router, this.baseUrl());
  }
}
