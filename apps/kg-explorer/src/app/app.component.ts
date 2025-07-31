import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterModule, RoutesRecognized } from '@angular/router';
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
  protected readonly crumbs = computed(() => this.data()['crumbs'] ?? [{ name: 'Apps' }, { name: this.pageTitle() }]);

  /** If the user is navigating to a different page */
  protected readonly isNavigating = isNavigating();

  /** Params for metadata pages */
  private readonly params = signal<{ name?: string; type?: string; version?: string }>({});

  /**
   * Gets the page title for breadcrumbs
   */
  constructor() {
    this.router.events.subscribe((val) => {
      if (val instanceof RoutesRecognized) {
        const name = val.state.root.firstChild?.params['name'];
        const type = val.state.root.firstChild?.params['type'];
        const version = val.state.root.firstChild?.params['version'];
        this.params.set({ name, type, version });
      }
    });

    effect(() => {
      this.kg.digitalObjects().subscribe((data) => {
        this.pageTitle.set(
          data['@graph']?.find(
            (x) =>
              x.lod ===
              ['https://lod.humanatlas.io', this.params().type, this.params().name, this.params().version].join('/'),
          )?.title,
        );
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
