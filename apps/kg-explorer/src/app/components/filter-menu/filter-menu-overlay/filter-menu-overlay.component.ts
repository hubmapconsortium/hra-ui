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
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';

import { FilterOption, FilterOptionCategory } from '../../../pages/main-page/main-page.component';

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
  ],
  templateUrl: './filter-menu-overlay.component.html',
  styleUrl: './filter-menu-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuOverlayComponent implements OnInit {
  readonly router = inject(Router);
  readonly searchControl = new UntypedFormControl();
  readonly form = input.required<FormControl<FilterOption[] | null>>();
  readonly filterOptionCategory = input.required<FilterOptionCategory>();
  readonly filteredOptions = signal<FilterOption[]>([]);

  selectedOptions: FilterOption[] = [];

  readonly filterChanged = output();

  /** Displayed chip options */
  readonly chips = signal([] as FilterOption[]);

  constructor() {
    effect(() => {
      if (this.filterOptionCategory()) {
        this.filteredOptions.set(this.filterOptionCategory().options);
      }
    });

    this.searchControl.valueChanges.subscribe((result) => {
      this.onSearchChange(result);
    });
  }

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
   * Removes option from the chip list
   * @param option Option name
   */
  remove(option: FilterOption): void {
    this.chips.update((chips) => {
      this.selectedOptions = this.selectedOptions.filter((o) => o.id !== option.id);
      const updatedValue = chips.filter((o) => o !== option);
      this.form().setValue(updatedValue);
      this.filterChanged.emit();
      return updatedValue;
    });
  }

  private onSearchChange(searchTerm: string): void {
    this.filteredOptions.set(
      this.filterOptionCategory().options.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    );
  }

  selectOption(option: FilterOption) {
    if (this.selectedOptions.map((x) => x.id).includes(option.id)) {
      this.remove(option);
    } else {
      this.selectedOptions.push(option);
    }
    this.form().patchValue(this.selectedOptions);
    this.filterChanged.emit();
  }

  navigateToLink(link?: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }
}
