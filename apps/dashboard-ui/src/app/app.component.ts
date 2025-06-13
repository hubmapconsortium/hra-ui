import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { routeData } from './shared/utils/route-data';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/**
 * App Component
 */
@Component({
  selector: 'hra-root',
  imports: [ButtonsModule, IconsModule, NavigationModule, RouterModule, PlainTooltipDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
})
export class AppComponent {
  /** Route Data */
  private readonly data = routeData();
  /**
   * Breadcrumbs data (computed from above signal).
   */
  protected readonly crumbs = computed(() => this.data()['crumbs'] as BreadcrumbItem[] | undefined);

  /** Initialize app */
  constructor() {
    inject(Router).initialNavigation();
  }
}
