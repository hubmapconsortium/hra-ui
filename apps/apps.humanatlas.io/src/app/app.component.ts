import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { NavigationModule } from '@hra-ui/design-system/navigation';
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
}
