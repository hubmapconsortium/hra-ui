import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies navigation rail menu styles globally.
 * Menus render in the overlay container, outside the rail.
 */
@Component({
  selector: 'hra-navigation-rail-menu-styles',
  template: '',
  styleUrl: './navigation-rail-menu-styles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavigationRailMenuStylesComponent {}
