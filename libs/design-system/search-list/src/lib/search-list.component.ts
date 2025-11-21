import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';

/** Filter menu option interface */
export interface FilterMenuOption {
  /** Option id */
  id: string;
  /** Option label */
  label: string;
  /** Secondary label */
  secondaryLabel?: string;
  /** Number of results for the filter option in the data */
  count: number;
}

/**
 * Keyboard-accessible filter list flyout menu with an optional search text field with autocomplete
 */
@Component({
  selector: 'hra-search-list',
  imports: [
    HraCommonModule,
    IconsModule,
    ButtonsModule,
    ScrollingModule,
    ScrollOverflowFadeDirective,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
  ],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent {
  /** Filter search form control */
  readonly searchControl = new FormControl();

  /** Whether to show the autocomplete search bar */
  readonly showSearch = input<boolean>(true);

  /** Whether to disable the ripple effect for list items */
  readonly disableRipple = input<boolean>(false);

  /** All filter options */
  readonly filterOptions = input.required<FilterMenuOption[]>();

  /** Currently selected filter IDs */
  readonly currentFilters = input<string[] | undefined>();

  /** Currently selected options */
  readonly selectedOptions = signal<FilterMenuOption[]>([]);

  /** Current search bar value */
  readonly searchValue = signal<string>('');

  /** Filtered options (after typing in search bar) */
  readonly filteredOptions = computed(() => {
    if (this.searchValue() !== '') {
      return (
        this.filterOptions()?.filter((option) =>
          option.label.toLowerCase().includes(this.searchValue().toLowerCase()),
        ) || []
      );
    }
    return this.filterOptions();
  });

  /** Emits currently selected filter options on change */
  readonly filtersChanged = output<FilterMenuOption[]>();

  /**
   * Sets options in the filter menu and subscribes to searchbar inputs
   */
  constructor() {
    effect(() => {
      const selectedFilterOptions =
        this.filterOptions()?.filter((option) => this.currentFilters()?.includes(option.id)) || []; //filter options remaining with current filters applied
      this.selectedOptions.set(selectedFilterOptions); //set the currently selected options to the filtered options
    });

    this.searchControl.valueChanges.subscribe(() => {
      this.searchValue.set(this.searchControl.value);
    });
  }

  /**
   * Handles selection changes in the filter menu
   * @param event Selection change event
   */
  handleSelectionChange(event: MatSelectionListChange): void {
    const selectedOptions = event.source.selectedOptions.selected.map((option) => option.value);
    this.selectedOptions.set(selectedOptions);
    this.filtersChanged.emit(this.selectedOptions());
  }
}
