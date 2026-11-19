import { Directive, effect, inject, input, untracked } from '@angular/core';
import { MAT_MENU_DEFAULT_OPTIONS, MatMenu, MatMenuDefaultOptions, MenuPositionY } from '@angular/material/menu';
import { registerStyleComponents } from '@hra-ui/cdk/styling';
import { NavigationRailMenuStylesComponent } from './navigation-rail-menu-styles.component';
import { NavigationRailOrientation } from './navigation-rail-orientation';

/** Overlay pane class for menus opened from a navigation rail */
export const NAVIGATION_RAIL_MENU_PANEL_CLASS = 'hra-navigation-rail-menu';

/** Menu panel class for menus opened from a horizontal rail, which open above it without the side offset */
export const NAVIGATION_RAIL_MENU_HORIZONTAL_CLASS = 'hra-navigation-rail-menu--horizontal';

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
 * Menus of a horizontal rail open above their item; set `hraNavigationRailMenuOrientation` to match the rail.
 */
@Directive({
  selector: 'mat-menu[hraNavigationRailMenu]',
  providers: [{ provide: MAT_MENU_DEFAULT_OPTIONS, useFactory: navigationRailMenuOptions }],
})
export class NavigationRailMenuDirective {
  /** Orientation of the rail the menu opens from */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  readonly orientation = input<NavigationRailOrientation>('vertical', { alias: 'hraNavigationRailMenuOrientation' });

  /** Menu the directive positions */
  private readonly menu = inject(MatMenu, { self: true });

  /** Vertical position the menu was given, restored when the rail turns vertical again */
  private verticalYPosition?: MenuPositionY;

  /** Whether the menu has the horizontal panel class, so a vertical menu's own classes are left alone */
  private hasHorizontalClass = false;

  /** Registers the menu styles and positions the menu for the rail's orientation */
  constructor() {
    registerStyleComponents([NavigationRailMenuStylesComponent]);

    effect(() => {
      const horizontal = this.orientation() === 'horizontal';
      untracked(() => {
        const menu = this.menu;
        this.verticalYPosition ??= menu.yPosition;
        menu.overlapTrigger = !horizontal;
        menu.yPosition = horizontal ? 'above' : this.verticalYPosition;
        if (horizontal !== this.hasHorizontalClass) {
          menu.panelClass = horizontal ? NAVIGATION_RAIL_MENU_HORIZONTAL_CLASS : '';
          this.hasHorizontalClass = horizontal;
        }
      });
    });
  }
}
