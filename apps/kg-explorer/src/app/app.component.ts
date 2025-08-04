import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HraKgService } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { MarkdownModule } from 'ngx-markdown';

import { isNavigating } from './utils/navigation';
import { routeData } from './utils/route-data';

/**
 * Main application component
 */
@Component({
  imports: [RouterModule, NavigationModule, MarkdownModule, ButtonsModule, IconsModule, PlainTooltipDirective],
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

  /** Route params used to calculate objectLod */
  readonly params = signal<string[]>([]);

  /** Lod of digital object computed from params */
  readonly objectLod = computed(() => ['https://lod.humanatlas.io'].concat(this.params()).join('/'));

  /**
   * Gets the page title for breadcrumbs
   */
  constructor() {
    this.router.events.subscribe(() => {
      const type = this.route.snapshot.root.firstChild?.params['type'];
      const name = this.route.snapshot.root.firstChild?.params['name'];
      const version = this.route.snapshot.root.firstChild?.params['version'];
      if (type && name && version) {
        this.params.set([type, name, version]);
      }
    });

    toObservable(this.objectLod).subscribe((lod) => {
      this.kg.digitalObjects().subscribe((data) => {
        const match = data['@graph']?.find((object) => object.lod === lod);
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
