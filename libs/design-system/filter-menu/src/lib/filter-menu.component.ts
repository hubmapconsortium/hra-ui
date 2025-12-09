import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, computed, contentChildren, input, model, output } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { FilterChip, FilterContainerComponent } from '@hra-ui/design-system/filter-container';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { SearchListComponent, SearchListOption } from '@hra-ui/design-system/search-list';

/** Filter option category interface */
export interface FilterOptionCategory<T extends SearchListOption> {
  /** Category id */
  id: string;
  /** Category label */
  label: string;
  /** All filter options */
  options: T[];
  /** Selected filter options */
  selected?: T[];
}

/** Position of the filter menu overlay */
const FILTER_MENU_POSITIONS: ConnectedPosition[] = [
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
  /** Menu tagline */
  readonly tagline = input<string>();

  /** Menu description */
  readonly description = input<string>();

  /** Whether to show the close button */
  readonly enableClose = input<boolean>();

  /** List of all filters with options */
  readonly filters = model.required<FilterOptionCategory<T>[]>();

  /** Current active filter */
  readonly activeFilter = model<FilterOptionCategory<T>>();

  /** Current active filter id */
  readonly activeFilterId = computed(() => this.activeFilter()?.id);

  /** Emits when the form opening state is toggled */
  readonly closeClick = output();

  /** Whether the user is on a wide screen */
  protected readonly isWideScreen = watchBreakpoint('(min-width: 1100px)');

  /** Overlay positions for the filter menu */
  protected readonly filterMenuPositions = FILTER_MENU_POSITIONS;

  /** Detects if there are controls in the component */
  protected readonly controls = contentChildren('*');

  /**
   * Updates filters on chips change
   * @param category Filter category to update
   * @param chips Currently active chips
   */
  updateFiltersFromChips(category: FilterOptionCategory<T>, chips: FilterChip[]) {
    const selected = category.options.filter((option) => chips.map((chip) => chip.label).includes(option.label));
    const updated = { ...category, selected };
    this.setNewFilters(category, updated);
  }

  /**
   * Updates filters on filter selection
   * @param category Filter category to update
   * @param selected Selected filter options
   */
  updateFilterSelection(category: FilterOptionCategory<T>, selected: T[] = []) {
    const activeMenu = this.activeFilter();
    if (activeMenu) {
      const updated = { ...activeMenu, selected };
      this.setNewFilters(category, updated);
    }
  }

  /**
   * Converts a filter's selected options into chips
   * @param category Filter category
   */
  convertToChips(category: FilterOptionCategory<T>): FilterChip[] {
    const options = category.selected || [];
    return options.map((option) => {
      return { label: option.label };
    });
  }

  /**
   * Updates filters list with updated filter options
   * @param category Filter category
   * @param updated Updated filter category
   */
  private setNewFilters(category: FilterOptionCategory<T>, updated: FilterOptionCategory<T>): void {
    const updatedFilters = this.filters().map((filter) => {
      return filter.id === category.id ? updated : filter;
    });
    this.filters.set(updatedFilters);
  }
}
