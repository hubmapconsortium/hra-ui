import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatListOption } from '@angular/material/list';

/** Search list option interface */
export interface SearchListOption {
  /** Option id */
  id: string;
  /** Option label */
  label: string;
  /** Secondary label */
  secondaryLabel?: string;
  /** Number of results for the filter option in the data */
  count?: number;
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
export class SearchListComponent<T extends SearchListOption> {
  /** Whether to hide the autocomplete search bar */
  readonly disableSearch = input(false, { transform: booleanAttribute });

  /** Whether to disable the ripple effect for list items */
  readonly disableRipple = input(false, { transform: booleanAttribute });

  /** All filter options */
  readonly options = input.required<T[]>();

  /** Currently selected filters */
  readonly selected = model<T[] | undefined>([]);

  /** Current search bar value */
  readonly search = model<string>('');

  /** Filtered options (after typing in search bar) */
  readonly filteredOptions = computed(() => this.doSearch());

  /**
   * Updates selected options on update
   * @param event Selected options in list
   */
  selectionUpdate(event: MatListOption[]): void {
    this.selected.set(event.map((option) => option.value));
  }

  /** Filters options according to the search bar value */
  private doSearch(): T[] {
    const searchTerm = this.search().toLowerCase();
    return this.options().filter((option) => option.label.toLowerCase().includes(searchTerm));
  }
}
