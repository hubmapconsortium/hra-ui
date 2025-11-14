import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Menu } from '../types/menus.schema';
import { HraCommonModule } from '@hra-ui/common';
import { MatDividerModule } from '@angular/material/divider';
import { resolveUrl } from '../../../utils/url-resolver';

/**
 * Displays the menu for mobile screens
 */
@Component({
  selector: 'cns-menu-content',
  imports: [HraCommonModule, RouterModule, MatIconModule, ButtonsModule, MatDividerModule],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContentComponent {
  /** Menu data to display */
  readonly menu = input.required<Menu>();
  /** Base url - Menu urls starting with this will be converted into router links */
  readonly baseUrl = input.required<string | undefined>();

  /** Reference to the router if available */
  private readonly router = inject(Router, { optional: true });

  /** Resolves a url */
  resolve(url: string, external?: boolean) {
    return resolveUrl(url, external, this.router, this.baseUrl());
  }
}
