import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
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
export class AutocompleteChipsFormComponent implements OnInit {
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

  /** View Child for the Autocomplete Trigger */
  private readonly autoCompleteTrigger = viewChild<MatAutocompleteTrigger>('searchInput');

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

  ngOnInit() {
    const syncChips = (value: string[] | null) => {
      if (Array.isArray(value)) {
        this.chips.set(value);
      }
    };
    this.form().valueChanges.subscribe(syncChips);
    syncChips(this.form().value);
  }

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
      const updatedValue = options.filter((o) => o !== option);
      this.form().setValue(updatedValue);
      return updatedValue;
    });
  }

  /**
   * Updates form on option select
   * @param event Autocomplete selected event
   */
  optionSelected(event: MatAutocompleteSelectedEvent): void {
    const selected = event.option.viewValue;
    if (!this.chips().includes(selected)) {
      const updatedValue = [...this.chips(), selected];
      this.chips.set(updatedValue);
      this.form().setValue(updatedValue);
    }
    this.currentInputValue.set('');
    this.selectedOptions.emit();
    event.option.deselect();
  }

  /**
   * Updates form on checkbox click
   * @param event Checkbox change event
   * @param option Option name
   */
  checkboxSelected(event: MatCheckboxChange, option: string): void {
    if (event.checked) {
      if (!this.chips().includes(option)) {
        const updatedValue = [...this.chips(), option];
        this.chips.set(updatedValue);
        this.form().setValue(updatedValue);
        this.selectedOptions.emit();
      }
    } else {
      this.remove(option);
    }
    this.currentInputValue.set('');
  }

  /** Closes the Autocomplete panel when user presses the escape button */
  closeAutocomplete(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.autoCompleteTrigger()?.closePanel();
    }
  }
}
