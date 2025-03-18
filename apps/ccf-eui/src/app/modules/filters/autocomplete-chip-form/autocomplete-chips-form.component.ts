import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

/**
 * Autocomplete chips form component for filters
 */
@Component({
  selector: 'ccf-autocomplete-chips-form',
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    ScrollingModule,
    MatCheckboxModule,
  ],
  templateUrl: './autocomplete-chips-form.component.html',
  styleUrl: './autocomplete-chips-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteChipsFormComponent {
  /** Input form label */
  readonly label = input.required<string>();

  /** All available dropdown options */
  readonly filterOptions = input.required<string[]>();

  /** FormControl for the form */
  readonly form = input.required<FormControl<string[] | null>>();

  /** Keys that trigger a chip to be added */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /** Current input value */
  readonly currentInputValue = model('');

  /** Displayed chip options */
  readonly chips = signal([] as string[]);

  /** Autocomplete dropdown options filtered by input, removes all selected options from list */
  readonly filteredOptions = computed(() => {
    const currentValue = this.currentInputValue().toLowerCase();
    const filteredWithoutSelected = this.filterOptions().filter((value) => !this.chips().includes(value));
    return currentValue
      ? filteredWithoutSelected.filter((value) => value.toLowerCase().includes(currentValue))
      : filteredWithoutSelected.slice();
  });

  /** True if no results are found for the input */
  readonly errorState = computed(() => {
    return (
      this.currentInputValue().length > 0 &&
      (this.filteredOptions().length === 0 ||
        !this.filteredOptions().find((option) => option.toLowerCase().includes(this.currentInputValue().toLowerCase())))
    );
  });

  /** Emits selected options */
  readonly selectedOptions = output();

  /**
   * Adds option to chip list
   * @param event Chip input event
   */
  add(event: MatChipInputEvent): void {
    if (this.errorState()) {
      return;
    }
    const value = (event.value || '').trim();

    if (value && this.filteredOptions().find((option) => option.toLowerCase() === value.toLowerCase())) {
      this.chips.update((option) => [...option, value]);
      this.currentInputValue.set('');
      event.chipInput.clear();
    }
  }

  /**
   * Removes option from the chip list
   * @param option Option name
   */
  remove(option: string): void {
    this.chips.update((options) => {
      const index = options.indexOf(option);
      if (index < 0) {
        return options;
      }

      options.splice(index, 1);
      return [...options];
    });
  }

  /**
   * Updates form on option select
   * @param event Autocomplete selected event
   */
  optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.chips.update((options) => [...options, event.option.viewValue]);
    this.currentInputValue.set('');
    this.selectedOptions.emit();
    this.form().setValue([]);
    event.option.deselect();
  }

  /**
   * Updates form on checkbox click
   * @param event Checkbox change event
   * @param option Option name
   */
  checkboxSelected(event: MatCheckboxChange, option: string): void {
    if (!event.checked) {
      this.remove(option);
      return;
    }
    this.chips.update((options) => [...options, option]);
    this.currentInputValue.set('');
    this.selectedOptions.emit();
    this.form().setValue([]);
  }
}
