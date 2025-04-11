import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { DEFAULT_MENUS, Menu } from '@hra-ui/design-system/navigation/header';
import { isNavigating } from './utils/navigation';
import { routeData } from './utils/route-data';

/** Main application component */
@Component({
  selector: 'hra-root',
  imports: [CommonModule, RouterModule, NavigationModule],
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
  protected readonly crumbs = computed((): BreadcrumbItem[] => this.data()['crumbs'] ?? []);

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
          target: '_self',
          items: [
            {
              type: 'item',
              label: 'User Story 1',
              url: '/us1',
              target: '_self',
            },
            {
              type: 'item',
              label: 'User Story 2',
              url: '/us2',
              target: '_self',
            },
            {
              type: 'item',
              label: 'User Story 6',
              url: '/us6',
              target: '_self',
            },
            {
              type: 'item',
              label: 'API',
              url: '/api',
              target: '_self',
            },
            {
              type: 'item',
              label: 'EUI',
              url: 'https://cdn.humanatlas.io/ui--staging/ccf-eui/',
            },
          ],
        },
      ],
    },
  ];
}
