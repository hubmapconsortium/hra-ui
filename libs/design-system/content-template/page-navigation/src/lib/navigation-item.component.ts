import { Component, computed, input, output } from '@angular/core';

import { Section } from './page-navigation.component';

/**
 * Navigation item to display in the page navigation component, may contain other navigation items
 */
@Component({
  selector: 'hra-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.scss',
})
export class NavigationItemComponent {
  /** Section for the item */
  readonly section = input.required<Section>();

  /** Level of nesting for the item */
  readonly level = input<number>(0);

  /** Currently selected item in the page navigation component */
  readonly currentItem = input<Section>();

  /** Emits name of section when clicked */
  readonly itemClicked = output<Section>();

  /** If this item is the same as the currently selected item */
  readonly selected = computed(() => this.currentItem()?.name === this.section().name);

  /** Href for the navigation link to this section*/
  readonly navigationLink = computed(() => `#${this.section().name.toLowerCase().replaceAll(' ', '-')}`);
}
