import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FilterMenuOption, FilterOptionCategory } from '../filter-menu.component';

@Component({
  selector: 'hra-filter-list-flyout',
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
  templateUrl: './filter-list-flyout.component.html',
  styleUrl: './filter-list-flyout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterListFlyoutComponent {
  /** Filter search form control */
  readonly searchControl = new UntypedFormControl();

  // /** Filter form control */
  // readonly form = input.required<FormControl<FilterMenuOption[] | null>>();

  /** Filter category containing options and other data */
  readonly filterOptionCategory = input.required<FilterOptionCategory>();

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
        this.filterOptionCategory().options?.filter((option) =>
          option.label.toLowerCase().includes(this.searchValue().toLowerCase()),
        ) || []
      );
    }
    return this.filterOptionCategory().options;
  });

  /**
   * Sets options for the filter category and subscribes to searchbar inputs
   */
  constructor() {
    effect(() => {
      const selectedFilterOptions =
        this.filterOptionCategory().options?.filter((option) => this.currentFilters()?.includes(option.id)) || []; //filter options remaining with current filters applied
      this.selectedOptions.set(selectedFilterOptions); //set the currently selected options to the filtered options
      // this.form().patchValue(this.selectedOptions());
    });

    this.searchControl.valueChanges.subscribe(() => {
      this.searchValue.set(this.searchControl.value);
    });
  }

  selectOption(option: FilterMenuOption): void {
    console.log(option);
  }
}
