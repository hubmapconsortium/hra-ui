import { ChangeDetectionStrategy, Component, contentChildren, input, model, output } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { FilterChip, FilterContainerComponent } from '@hra-ui/design-system/filter-container';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { SearchListComponent, SearchListOption } from '@hra-ui/design-system/search-list';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';

/** Filter option category interface */
export interface FilterOptionCategory<T extends SearchListOption> {
  /** Category id */
  id: string;
  /** Category label */
  label: string;
  /** Filter options for the category */
  options: T[];
  selected?: T[];
}

/** Position of the desktop menu overlay */
const DESKTOP_MENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 16 },
];

/**
 * A collapsing menu with ways to refine databases to particular views, sorting and grouping preferences, and filters
 */
@Component({
  selector: 'hra-filter-menu',
  imports: [
    HraCommonModule,
    ScrollingModule,
    ScrollOverflowFadeDirective,
    ButtonsModule,
    IconsModule,
    FilterContainerComponent,
    OverlayModule,
    SearchListComponent,
  ],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuComponent<T extends SearchListOption> {
  /** Filter options */
  readonly filters = model.required<FilterOptionCategory<T>[]>();

  /** Menu tagline */
  readonly tagline = input<string>();

  /** Menu description */
  readonly description = input<string>();

  /** Whether to show the close button */
  readonly enableClose = input<boolean>();

  /** Emits when the form opening state is toggled */
  readonly closeClick = output();

  /** Whether the user is on a wide screen */
  protected readonly isWideScreen = watchBreakpoint('(min-width: 1100px)');

  /** Detects if there are controls in the component */
  protected readonly controls = contentChildren('*');

  /** Whether the menu is active/open */
  readonly menuActive = model<string>();

  /** Overlay positions for the desktop menu */
  protected readonly desktopMenuPositions = DESKTOP_MENU_POSITIONS;

  /**
   * Toggles menu active state
   */
  toggleMenu(id: string): void {
    this.menuActive.set(id);
  }

  closeMenu() {
    this.menuActive.set(undefined);
  }

  updateChips(category: string, selected: FilterChip[]) {
    const currentCategory = this.filters().find((a) => category === a.id);
    if (currentCategory) {
      const newOptions = currentCategory.options.filter((option) =>
        selected.map((chip) => chip.label).includes(option.label),
      );
      const updated = { ...currentCategory, selected: newOptions };
      this.setNewFilters(category, updated);
    }
  }

  updateFilter(category: string, event: T[] = []) {
    const currentCategory = this.filters().find((a) => this.menuActive() === a.label);
    if (currentCategory) {
      const updated = { ...currentCategory, selected: event };
      this.setNewFilters(category, updated);
    }
  }

  convertToChips(filter: FilterOptionCategory<T>): FilterChip[] {
    if (filter.selected) {
      return filter.selected.map((x) => {
        return { label: x.label };
      });
    }
    return [];
  }

  setNewFilters(category: string, updated: FilterOptionCategory<T>): void {
    const updatedFilters = this.filters().map((filter) => {
      if (filter.id !== category) {
        return filter;
      }
      return updated;
    });
    this.filters.set(updatedFilters);
  }
}
