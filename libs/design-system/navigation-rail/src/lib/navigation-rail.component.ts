import { FocusKeyManager } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  DestroyRef,
  Directive,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { NavigationRailItemComponent } from './navigation-rail-item.component';

/** Marks items, or an `ng-container` of items, to pin to the bottom of the rail */
@Directive({
  selector: '[hraNavigationRailBottom]',
})
export class NavigationRailBottomDirective {}

/**
 * Tooltip options for rail items: tooltips open beside the rail instead of over the next item
 *
 * @returns Tooltip options
 */
function navigationRailTooltipOptions(): MatTooltipDefaultOptions {
  return { ...inject(MAT_TOOLTIP_DEFAULT_OPTIONS, { skipSelf: true }), position: 'after' };
}

/**
 * Vertical rail of app-wide actions, styled after the Material 3 navigation rail.
 * It's a toolbar, so the rail is a single tab stop and the arrow keys, Home and End move between items.
 * Give it an `aria-label`.
 */
@Component({
  selector: 'hra-navigation-rail',
  templateUrl: './navigation-rail.component.html',
  styleUrl: './navigation-rail.component.scss',
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useFactory: navigationRailTooltipOptions }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'toolbar',
    'aria-orientation': 'vertical',
    '(keydown)': 'handleKeydown($event)',
    '(focusin)': 'handleFocusIn($event)',
  },
})
export class NavigationRailComponent {
  /** Items in the rail, including the bottom ones */
  private readonly items = contentChildren(NavigationRailItemComponent, { descendants: true });

  /** Moves focus between items */
  private readonly keyManager = new FocusKeyManager(this.items, inject(Injector))
    .withVerticalOrientation()
    .withHomeAndEnd()
    .withWrap();

  /** Item that had focus last */
  private readonly focusedItem = signal<NavigationRailItemComponent | undefined>(undefined);

  /** Keeps a single item in the tab order: the one focused last, or else the first enabled one */
  constructor() {
    inject(DestroyRef).onDestroy(() => this.keyManager.destroy());

    effect(() => {
      const items = this.items();
      const focused = this.focusedItem();
      const tabStop = focused && items.includes(focused) ? focused : items.find((item) => !item.disabled);
      for (const item of items) {
        item.setTabStop(item === tabStop);
      }
    });
  }

  /**
   * Moves focus with the arrow keys, Home and End
   *
   * @param event Keyboard event
   */
  protected handleKeydown(event: KeyboardEvent): void {
    this.keyManager.onKeydown(event);
  }

  /**
   * Tracks the focused item, including focus that returns from a menu or sheet
   *
   * @param event Focus event
   */
  protected handleFocusIn(event: FocusEvent): void {
    const item = this.items().find((candidate) => candidate.contains(event.target as Node | null));
    if (item) {
      this.keyManager.updateActiveItem(item);
      this.focusedItem.set(item);
    }
  }
}
