import { Component, input, output, computed, effect, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HraCommonModule } from '@hra-ui/common';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';

/**
 * Interface representing a search filter option
 */
export interface SearchFilterOption {
  /** Label to display for the option */
  label: string;
  /** Value associated with the option */
  value: string;
}

/**
 * Search Filter Component
 */
@Component({
  selector: 'hra-search-filter',
  imports: [
    HraCommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    ResultsIndicatorComponent,
  ],
  standalone: true,
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent {
  /** Label for the form field */
  readonly label = input.required<string>();

  /** Array of searchable items */
  readonly options = input<SearchFilterOption[]>([]);

  /** Emits when a selection is made */
  readonly selectionChange = output<SearchFilterOption | null>();

  /** Current search query as a model */
  readonly search = model<string>('');

  /** Emits filtered results */
  readonly filteredResultsChange = output<SearchFilterOption[]>();

  /** Form control for the search input */
  readonly searchControl = new FormControl('');

  /** Signal holding the search query - derived from search model */
  protected readonly searchQuery = computed(() => this.search());

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
    // Sync form control value changes to search model (internal -> external)
    effect(() => {
      const controlValue = this.searchControl.value || '';
      this.search.set(controlValue);
    });

    // Sync search model changes to form control (external -> internal)
    effect(() => {
      const currentSearch = this.search();
      const controlValue = this.searchControl.value || '';
      if (currentSearch !== controlValue) {
        this.searchControl.setValue(currentSearch, { emitEvent: false });
      }
    });

    effect(() => {
      this.filteredResultsChange.emit(this.filteredOptions());
    });
  }

  /**
   * Handles filter option selection
   */
  onOptionSelected(option: SearchFilterOption): void {
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
   * Display function for filter dropdown
   */
  displayWith(option: SearchFilterOption | null): string {
    return option?.label || '';
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByValue(_index: number, option: SearchFilterOption): string {
    return option.value;
  }
}
