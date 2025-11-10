import { Component, input, output, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Interface representing a search autocomplete option
 */
export interface SearchAutocompleteOption {
  /** Label to display for the option */
  label: string;
  /** Value associated with the option */
  value: string;
}

/**
 * Search Autocomplete Component
 */
@Component({
  selector: 'hra-search-autocomplete',
  standalone: true,
  imports: [
    HraCommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss'],
})
export class SearchAutocompleteComponent {
  /** Placeholder text for the search input */
  readonly placeholder = input('Search');

  /** Label for the form field */
  readonly label = input('');

  /** Array of searchable items */
  readonly options = input<SearchAutocompleteOption[]>([]);

  /** ARIA label for accessibility */
  readonly ariaLabel = input('Search with autocomplete');

  /** Emits when a selection is made */
  readonly selectionChange = output<SearchAutocompleteOption | null>();

  /** Emits the current search value on change */
  readonly searchChange = output<string>();

  /** Emits filtered results */
  readonly filteredResultsChange = output<SearchAutocompleteOption[]>();

  /** Form control for the search input */
  readonly searchControl = new FormControl('');

  /** Signal holding the search query - derived from form control */
  protected readonly searchQuery = toSignal(this.searchControl.valueChanges, { initialValue: '' });

  /** Computed filtered options based on search query */
  protected readonly filteredOptions = computed(() => {
    const query = (this.searchQuery() || '').toLowerCase().trim();
    const allOpts = this.options();

    if (!query) {
      return allOpts;
    }

    return allOpts.filter((option) => option.label.toLowerCase().includes(query));
  });

  /** Total number of options */
  protected readonly totalCount = computed(() => this.options().length);

  /** Number of currently visible/filtered options */
  protected readonly viewingCount = computed(() => this.filteredOptions().length);

  /** Constructor */
  constructor() {
    effect(() => {
      this.searchChange.emit(this.searchQuery() || '');
    });

    effect(() => {
      this.filteredResultsChange.emit(this.filteredOptions());
    });
  }

  /**
   * Handles autocomplete option selection
   */
  onOptionSelected(option: SearchAutocompleteOption): void {
    this.searchControl.setValue(option.label);
    this.selectionChange.emit(option);
  }

  /**
   * Clears the search input
   */
  clearSearch(): void {
    this.searchControl.setValue('');
    this.selectionChange.emit(null);
  }

  /**
   * Display function for autocomplete
   */
  displayWith(option: SearchAutocompleteOption | null): string {
    return option?.label || '';
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByValue(_index: number, option: SearchAutocompleteOption): string {
    return option.value;
  }
}
