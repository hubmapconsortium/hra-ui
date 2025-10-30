import { Component, input, output, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HraCommonModule } from '@hra-ui/common';

export interface SearchAutocompleteOption {
  label: string;
  value: string;
}

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
  readonly placeholder = input('Search');
  readonly label = input('');
  readonly options = input<SearchAutocompleteOption[]>([]);
  readonly sticky = input(true);
  readonly ariaLabel = input('Search with autocomplete');

  readonly selectionChange = output<SearchAutocompleteOption | null>();
  readonly searchChange = output<string>();
  readonly filteredResultsChange = output<SearchAutocompleteOption[]>();

  readonly searchControl = new FormControl('');

  protected readonly searchQuery = toSignal(this.searchControl.valueChanges, { initialValue: '' });

  protected readonly filteredOptions = computed(() => {
    const query = (this.searchQuery() || '').toLowerCase().trim();
    const allOpts = this.options();

    if (!query) {
      return allOpts;
    }

    return allOpts.filter((option) => option.label.toLowerCase().includes(query));
  });

  protected readonly totalCount = computed(() => this.options().length);
  protected readonly viewingCount = computed(() => this.filteredOptions().length);

  constructor() {
    effect(() => {
      this.searchChange.emit(this.searchQuery() || '');
    });

    effect(() => {
      this.filteredResultsChange.emit(this.filteredOptions());
    });
  }

  onOptionSelected(option: SearchAutocompleteOption): void {
    this.searchControl.setValue(option.label);
    this.selectionChange.emit(option);
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.selectionChange.emit(null);
  }

  displayWith(option: SearchAutocompleteOption | null): string {
    return option?.label || '';
  }

  trackByValue(_index: number, option: SearchAutocompleteOption): string {
    return option.value;
  }
}
