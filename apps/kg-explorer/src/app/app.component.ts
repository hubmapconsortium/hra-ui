import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';

import { isNavigating } from './utils/navigation';
import { routeData } from './utils/route-data';

/**
 * Main application component
 */
@Component({
  imports: [RouterModule, NavigationModule, ButtonsModule, IconsModule],
  selector: 'hra-kg-explorer-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /**
   * Data for breadcrumbs in navigation header.
   */
  private readonly data = routeData();

  /**
   * Breadcrumbs data (computed from above signal).
   */
  protected readonly crumbs = computed(() => this.data()['crumbs'] as BreadcrumbItem[] | undefined);

  /** is user navigating to a different page */
  protected readonly isNavigating = isNavigating();

  /** Router instance for navigation */
  private readonly router = inject(Router);

  /** Help data for the current route */
  getHelpUrl(): string {
    const currentRouteData = this.data();
    if (currentRouteData && currentRouteData['helpUrl']) {
      return currentRouteData['helpUrl'] as string;
    }
    return `lod.humanatlas.io${this.router.url}`;
  }
}
