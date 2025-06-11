import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListItemTitle } from '@angular/material/list';
import { Router, RouterLink, UrlTree } from '@angular/router';
import { DocsNavigationItem } from '../types/docs-navigation.schema';
import { currentRoutePath } from '../utils/navigation';

/** Navigation Item Component */
@Component({
  selector: 'hra-navigation-item',
  imports: [CommonModule, MatListItem, RouterLink, MatIconModule, MatListItemTitle],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationItemComponent {
  /** Navigation Item Data */
  readonly navigationItem = input.required<DocsNavigationItem>();

  /** Current Route */
  readonly currentPath = currentRoutePath();

  /** Base URL for the appliation */
  readonly baseUrl = input.required<string>();

  /** Angular Router */
  readonly router = inject(Router);

  /**
   * Boolean flag to indicate whether the
   * navigation item is present in a category or not.
   */
  readonly isInCategory = input<boolean>(false);

  isActive(path: string) {
    return computed(() => {
      const current = this.currentPath();
      const target = this.resolveUrl(path).value.toString();

      // Exact match OR target is a proper parent path
      if (target === '') {
        console.log(target);
        return current === '';
      }
      return current === target || current.startsWith(target + '/');
    });
  }

  /**
   * Resolves an url against the baseUrl
   * @param url Raw url
   * @returns Whether the url is absolute along with the resolved url
   */
  resolveUrl(url: string): { isAbsolute: boolean; value: string | UrlTree } {
    const baseUrl = Location.stripTrailingSlash(this.baseUrl() ?? '') + '/';
    let isAbsolute = url.startsWith('http');
    if (baseUrl && url.startsWith(baseUrl)) {
      isAbsolute = false;
      url = url.slice(baseUrl.length);
    }

    let value: string | UrlTree = url;
    if (!isAbsolute && this.router) {
      value = this.router.parseUrl(Location.stripTrailingSlash(url));
    }

    return { isAbsolute, value };
  }

  /**
   * Event handler for mat-list-item to navigate to the correct route.
   * @param url The URL to navigate to.
   */
  navigate(url: string) {
    const resolvedUrl = this.resolveUrl(url);
    if (resolvedUrl.isAbsolute) {
      window.location.href = resolvedUrl.value.toString();
    } else {
      this.router.navigateByUrl(resolvedUrl.value);
    }
  }
}
