import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListItemTitle } from '@angular/material/list';
import { Router, RouterModule, UrlTree } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { DocsNavigationItem } from '../types/docs-navigation.schema';
import { ACTIVE_MATCH_OPTIONS } from '../utils/match-options';
import { injectAppUrlResolver, isAbsolute } from '@hra-ui/common/url';

/** Navigation Item Component */
@Component({
  selector: 'hra-navigation-item',
  imports: [CommonModule, MatListItem, RouterModule, MatIconModule, MatListItemTitle, HraCommonModule],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationItemComponent {
  /** Navigation Item Data */
  readonly navigationItem = input.required<DocsNavigationItem>();

  /** Base URL for the appliation */
  readonly baseUrl = input<string>('');

  /** Resolved URL for the navigation item */
  protected readonly url = computed(() => this.urlResolver(this.navigationItem().url));

  /** Options for router link active */
  protected routerLinkActiveOptions = ACTIVE_MATCH_OPTIONS;

  /** Angular Router */
  private readonly router = inject(Router);

  urlResolver = injectAppUrlResolver();

  /**
   * Resolves an url against the baseUrl
   *
   * @param url Raw url
   * @returns Whether the url is absolute along with the resolved url
   */
  resolveUrl(url: string, forceExternal = false): { isAbsolute: boolean; value: string | UrlTree } {
    const resolved = this.urlResolver(url);
    if (forceExternal || isAbsolute(resolved) || !this.router) {
      return { isAbsolute: true, value: url };
    }

    return { isAbsolute: false, value: this.router.parseUrl(resolved) };
  }
}
