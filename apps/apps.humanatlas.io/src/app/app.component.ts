import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { DEFAULT_MENUS, Menu } from '@hra-ui/design-system/navigation/header';
import { isNavigating } from './utils/navigation';
import { routeData } from './utils/route-data';

/** Main application component */
@Component({
  selector: 'hra-apps',
  imports: [ButtonsModule, CommonModule, RouterModule, IconsModule, NavigationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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

  /** Beta menu */
  protected readonly menus: Menu[] = [
    ...DEFAULT_MENUS,
    {
      type: 'menu',
      id: 'beta',
      label: 'Beta',
      items: [
        {
          type: 'group',
          label: 'Beta links',
          description: '',
          url: '/',
          items: [
            {
              type: 'item',
              label: 'User Story 1',
              url: '/us1',
            },
            {
              type: 'item',
              label: 'User Story 2',
              url: '/us2',
            },
            {
              type: 'item',
              label: 'User Story 6',
              url: '/us6',
            },
            {
              type: 'item',
              label: 'API',
              url: '/api',
            },
            {
              type: 'item',
              label: 'EUI',
              url: 'https://apps.humanatlas.io/api--staging/eui/',
            },
            {
              type: 'item',
              label: 'RUI',
              url: 'https://apps.humanatlas.io/api--staging/rui/',
            },
            {
              type: 'item',
              label: 'ASCT+B Reporter',
              url: 'https://cdn.humanatlas.io/ui--staging/asctb-reporter/',
            },
            {
              type: 'item',
              label: 'FTU Explorer',
              url: 'https://apps.humanatlas.io/api--staging/ftu-explorer/',
            },
            {
              type: 'item',
              label: 'humanatlas.io',
              url: 'https://apps.humanatlas.io/beta--humanatlas.io/',
            },
            {
              type: 'item',
              label: 'docs.humanatlas.io',
              url: 'https://apps.humanatlas.io/beta--docs.humanatlas.io/',
            },
          ],
        },
      ],
    },
  ];

  protected readonly router = inject(Router);

  constructor() {
    effect(() => {
      // Log the current breadcrumbs to the console
      console.log('Current breadcrumbs:', this.crumbs());
      console.log('route data:', this.data());
      console.log('current url', this.router.url);
    });
  }
}
