import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  /** Activated route service */
  private readonly route = inject(ActivatedRoute);

  /** HRA KG API service */
  private readonly kg = inject(HraKgService);

  /** Page title to display on the breadcrumbs */
  private readonly pageTitle = signal<string>('');

  /** Data for breadcrumbs in navigation header. */
  private readonly data = routeData();

  /** Breadcrumbs data (computed from above signal). */
  protected readonly crumbs = computed(
    () =>
      this.data()['crumbs'] ?? [
        { name: 'Apps', route: 'https://apps.humanatlas.io/' },
        { name: 'Knowledge Graph', route: '/' },
        { name: this.pageTitle() },
      ],
  );

  /** If the user is navigating to a different page */
  protected readonly isNavigating = isNavigating();

  /**
   * Gets the page title for breadcrumbs
   */
  constructor() {
    this.router.events.subscribe(() => {
      const type = this.route.snapshot.root.firstChild?.params['type'];
      const name = this.route.snapshot.root.firstChild?.params['name'];
      const version = this.route.snapshot.root.firstChild?.params['version'];

      this.kg.digitalObjects().subscribe((data) => {
        const match = data['@graph']?.find(
          (object) => object.lod === ['https://lod.humanatlas.io', type, name, version].join('/'),
        );
        this.pageTitle.set(match?.title || '');
      });
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
