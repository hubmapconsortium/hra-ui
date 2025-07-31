import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HraKgService } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { MarkdownModule } from 'ngx-markdown';

import { isNavigating } from './utils/navigation';
import { routeData } from './utils/route-data';

/**
 * Main application component
 */
@Component({
  imports: [RouterModule, NavigationModule, MarkdownModule, ButtonsModule, IconsModule],
  selector: 'hra-kg-explorer',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** Router instance for navigation */
  private readonly router = inject(Router);

  /** HRA KG API service */
  private readonly kg = inject(HraKgService);

  /** Page title to display on the breadcrumbs */
  private readonly pageTitle = signal<string | undefined>(undefined);

  /** Data for breadcrumbs in navigation header. */
  private readonly data = routeData();

  /** Breadcrumbs data (computed from above signal). */
  protected readonly crumbs = computed(() => {
    if (this.data()['crumbs']) {
      return this.data()['crumbs'];
    }
    return [{ name: 'Apps' }, { name: this.pageTitle() }];
  });

  /** If the user is navigating to a different page */
  protected readonly isNavigating = isNavigating();

  constructor() {
    this.kg.digitalObjects().subscribe((data) => {
      this.pageTitle.set(
        data['@graph']?.find((x) => x.lod === 'https://lod.humanatlas.io' + window.location.pathname)?.title,
      );
    });
  }

  /** Help data for the current route */
  getHelpUrl(): string {
    const currentRouteData = this.data();
    if (currentRouteData && currentRouteData['helpUrl']) {
      return currentRouteData['helpUrl'] as string;
    }
    return `lod.humanatlas.io${this.router.url}`;
  }
}
