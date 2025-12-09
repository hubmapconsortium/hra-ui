import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { FilterContainerComponent } from '@hra-ui/design-system/filter-container';
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

  /** Emits when the form opening state is toggled */
  readonly closeClick = output();

  /** Whether the user is on a wide screen */
  protected readonly isWideScreen = watchBreakpoint('(min-width: 1100px)');

  /** Overlay positions for the filter menu */
  protected readonly filterMenuPositions = FILTER_MENU_POSITIONS;

  /** Current active filter */
  protected readonly activeFilter = signal<FilterOptionCategory<T> | undefined>(undefined);

  /** Current active filter id */
  protected readonly activeFilterId = computed(() => this.activeFilter()?.id);

  /**
   * Updates filters on filter selection
   * @param category Filter category to update
   * @param selected Selected filter options
   */
  updateFilterSelection(category: FilterOptionCategory<T>, selected: T[] = []) {
    const updated = { ...category, selected };
    this.filters.update((filters) => filters.map((filter) => (filter.id === category.id ? updated : filter)));
  }

  /**
   * Closes filter menu
   * @param category Filter category to close
   */
  closeFilterMenu(category?: FilterOptionCategory<T>): void {
    this.activeFilter.update((current) =>
      category !== undefined && current?.id !== category.id ? current : undefined,
    );
  }
}
