import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
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
    RichTooltipModule,
    ScrollingModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
  ],
  templateUrl: './filter-menu-overlay.component.html',
  styleUrl: './filter-menu-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuOverlayComponent {
  readonly searchControl = new UntypedFormControl();
  readonly form = input.required<FormControl<FilterOption[] | null>>();
  readonly filterOptionCategory = input.required<FilterOptionCategory>();
  readonly filteredOptions = signal<FilterOption[]>([]);
  readonly selectedOptions = new Set<FilterOption>();

  readonly filterChanged = output();

  constructor() {
    effect(() => {
      this.filteredOptions.set(this.filterOptionCategory().options);
    });

    this.searchControl.valueChanges.subscribe((result) => {
      this.onSearchChange(result);
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
    if (this.selectedOptions.has(option)) {
      this.selectedOptions.delete(option);
    } else {
      this.selectedOptions.add(option);
    }
    this.form().patchValue(Array.from(this.selectedOptions));
    this.filterChanged.emit();
  }
}
