import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { RouterExtModule } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollbarStore } from '../../../state/scrollbar/scrollbar.store';
import { Menu } from '../types/menus.schema';

/**
 * Displays the menu for mobile screens
 */
@Component({
  selector: 'cns-menu-content',
  imports: [HraCommonModule, RouterExtModule, MatIconModule, ButtonsModule, MatDividerModule],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContentComponent {
  /** Menu data to display */
  readonly menu = input.required<Menu>();

  /** Menu items with groups flattened */
  readonly flattenedMenuItems = computed(() => this.menu().items?.flatMap((group) => group.items));

  /** Scrollbar store for managing viewport scrolling */
  private readonly scrollbarStore = inject(ScrollbarStore);

  /**
   * Scrolls to the top of the page if the menu item is not an external link
   *
   * @param item Link item
   */
  maybeScrollToTop(item: { external?: boolean }): void {
    if (!item.external) {
      this.scrollbarStore.scrollToTop();
    }
  }
}
