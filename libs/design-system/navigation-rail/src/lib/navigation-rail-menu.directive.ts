import { Directive, inject } from '@angular/core';
import { MAT_MENU_DEFAULT_OPTIONS, MatMenuDefaultOptions } from '@angular/material/menu';
import { registerStyleComponents } from '@hra-ui/cdk/styling';
import { NavigationRailMenuStylesComponent } from './navigation-rail-menu-styles.component';

/** Overlay pane class for menus opened from a navigation rail */
export const NAVIGATION_RAIL_MENU_PANEL_CLASS = 'hra-navigation-rail-menu';

/**
 * Menu options for rail menus: the menu overlaps its trigger, and the panel class moves it past the rail
 *
 * @returns Menu options
 */
function navigationRailMenuOptions(): MatMenuDefaultOptions {
  const defaults = inject(MAT_MENU_DEFAULT_OPTIONS, { skipSelf: true });
  const panelClasses = defaults.overlayPanelClass ?? [];

  return {
    ...defaults,
    overlapTrigger: true,
    xPosition: 'after',
    overlayPanelClass: [
      ...(Array.isArray(panelClasses) ? panelClasses : [panelClasses]),
      NAVIGATION_RAIL_MENU_PANEL_CLASS,
    ],
  };
}

/**
 * Opens a `mat-menu` beside its navigation rail item instead of below it.
 * Use `yPosition="above"` for menus on bottom items.
 */
@Directive({
  selector: 'mat-menu[hraNavigationRailMenu]',
  providers: [{ provide: MAT_MENU_DEFAULT_OPTIONS, useFactory: navigationRailMenuOptions }],
})
export class NavigationRailMenuDirective {
  /** Registers the menu styles */
  constructor() {
    registerStyleComponents([NavigationRailMenuStylesComponent]);
  }
}
