import { ChangeDetectionStrategy, Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';

import { FilterOption, FilterOptionCategory } from '../../../pages/main-page/main-page.component';

/**
 * Menu for searching and selecting individual filters in a filter category
 */
@Component({
  selector: 'hra-filter-menu-overlay',
  imports: [
    HraCommonModule,
    IconsModule,
    ButtonsModule,
    MatIconModule,
    RichTooltipModule,
    ScrollingModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatChipsModule,
    PlainTooltipDirective,
  ],
  templateUrl: './filter-menu-overlay.component.html',
  styleUrl: './filter-menu-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuOverlayComponent implements OnInit {
  /** Router service */
  readonly router = inject(Router);

  /** Filter search form control */
  readonly searchControl = new UntypedFormControl();

  /** Filter form control */
  readonly form = input.required<FormControl<FilterOption[] | null>>();

  /** Filter category containing options and other data */
  readonly filterOptionCategory = input.required<FilterOptionCategory>();

  /** Initially selected filter IDs */
  readonly initialFilters = input<string[] | undefined>();

  /** Current selected options */
  readonly selectedOptions = signal<FilterOption[]>([]);
  /** Filtered options */
  readonly filteredOptions = signal<FilterOption[]>([]);
  /** Displayed chip options */
  readonly chips = signal([] as FilterOption[]);

  /** Emits when filter selection is changed */
  readonly filterChanged = output();

  /**
   * Sets options for the filter category and subscribes to searchbar inputs
   */
  constructor() {
    effect(() => {
      const initialFilters =
        this.filterOptionCategory().options?.filter((option) => this.initialFilters()?.includes(option.id)) || null;
      this.form().patchValue(initialFilters);
    });
    effect(() => {
      this.filteredOptions.set(this.filterOptionCategory().options || []);
    });

    this.searchControl.valueChanges.subscribe((result) => {
      this.onSearchChange(result);
    });
  }

  /**
   * Syncs chips with the form control
   */
  ngOnInit() {
    const syncChips = (value: FilterOption[] | null) => {
      if (Array.isArray(value)) {
        this.chips.set(value);
      }
    };
    this.form().valueChanges.subscribe(syncChips);
    syncChips(this.form().value);
  }

  /**
   * Adds option to the chip list
   * @param option Option name
   */
  selectOption(option: FilterOption) {
    const options = this.selectedOptions();
    if (options.map((x) => x.id).includes(option.id)) {
      this.remove(option);
    } else {
      options.push(option);
    }
    this.selectedOptions.set(options);
    this.form().patchValue(this.selectedOptions());
    this.filterChanged.emit();
  }

  /**
   * Removes option from the chip list
   * @param option Option name
   */
  remove(option: FilterOption): void {
    this.chips.update((chips) => {
      const options = this.selectedOptions();
      this.selectedOptions.set(options.filter((o) => o.id !== option.id));
      const updatedValue = chips.filter((o) => o !== option);
      this.form().setValue(updatedValue);
      this.filterChanged.emit();
      return updatedValue;
    });
  }

  /**
   * Navigates to url in a separate window
   * @param Url
   */
  navigateToLink(url?: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  /**
   * Filters the options when user types in a search term
   * @param searchTerm current search term
   */
  private onSearchChange(searchTerm: string): void {
    this.filteredOptions.set(
      (this.filterOptionCategory().options || []).filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    );
  }
}
