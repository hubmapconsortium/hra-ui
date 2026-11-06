import { FocusableOption } from '@angular/cdk/a11y';
import { booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, inject, input, signal } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Navigation rail item: an icon above a label, on a button or a link.
 * The projected content is the label; long labels wrap to two lines.
 * Add `hraPlainTooltip` to describe what the item does.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[hraNavigationRailItem], a[hraNavigationRailItem]',
  imports: [MatIconModule, MatRippleModule],
  templateUrl: './navigation-rail-item.component.html',
  styleUrl: './navigation-rail-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'hra-navigation-rail-item',
    '[class.hra-navigation-rail-item--active]': 'active()',
    '[attr.tabindex]': 'tabIndex()',
  },
})
export class NavigationRailItemComponent implements FocusableOption {
  /** Material Symbols icon name */
  readonly icon = input.required<string>();

  /**
   * Shows the item as active. Use it for items that open a drawer or sheet.
   * Toggles (`aria-pressed`) and the current page (`aria-current`) show as active without it.
   * An item whose menu is open (`aria-expanded`) gets a light highlight instead.
   */
  readonly active = input(false, { transform: booleanAttribute });

  /** Tab index set by the rail, so the rail is a single tab stop */
  protected readonly tabIndex = signal<number | null>(null);

  /** Host element, which also triggers the ripple */
  protected readonly hostElement = inject<ElementRef<HTMLButtonElement | HTMLAnchorElement>>(ElementRef).nativeElement;

  /** Whether the item is disabled. The arrow keys skip disabled items. */
  get disabled(): boolean {
    return (
      ('disabled' in this.hostElement && this.hostElement.disabled) ||
      this.hostElement.getAttribute('aria-disabled') === 'true'
    );
  }

  /** Focuses the item */
  focus(): void {
    this.hostElement.focus();
  }

  /**
   * Checks whether a node is the item or inside it
   *
   * @param node Node to check
   * @returns Whether the item contains the node
   */
  contains(node: Node | null): boolean {
    return this.hostElement.contains(node);
  }

  /**
   * Makes the item the rail's tab stop or removes it from the tab order
   *
   * @param isTabStop Whether the item is the tab stop
   */
  setTabStop(isTabStop: boolean): void {
    this.tabIndex.set(isTabStop ? 0 : -1);
  }
}
