import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

@Component({
  selector: 'ccf-autocomplete-chips-form',
  standalone: true,
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
  readonly label = input.required<string>();
  readonly filterOptions = input.required<string[]>();
  readonly form = input.required<FormControl<string[] | null>>();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  readonly currentInputValue = model('');
  readonly options = signal([] as string[]);
  readonly filteredOptions = computed(() => {
    const currentValue = this.currentInputValue().toLowerCase();
    const filteredWithoutSelected = this.filterOptions().filter((value) => !this.options().includes(value));
    return currentValue
      ? filteredWithoutSelected.filter((value) => value.toLowerCase().includes(currentValue))
      : filteredWithoutSelected.slice();
  });

  readonly errorState = computed(() => {
    return (
      this.currentInputValue().length > 0 &&
      (this.filteredOptions().length === 0 ||
        !this.filteredOptions().find((option) => option.toLowerCase().includes(this.currentInputValue().toLowerCase())))
    );
  });

  add(event: MatChipInputEvent): void {
    if (this.errorState()) {
      return;
    }
    const value = (event.value || '').trim();

    if (value && this.filteredOptions().find((option) => option.toLowerCase() === value.toLowerCase())) {
      this.options.update((option) => [...option, value]);
      this.currentInputValue.set('');
      event.chipInput.clear();
    }
  }

  remove(option: string): void {
    this.options.update((options) => {
      const index = options.indexOf(option);
      if (index < 0) {
        return options;
      }

      options.splice(index, 1);
      return [...options];
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.options.update((options) => [...options, event.option.viewValue]);
    this.currentInputValue.set('');
    this.form().setValue(['']);
    event.option.deselect();
  }

  selected(event: MatCheckboxChange, option: string): void {
    if (!event.checked) {
      this.remove(option);
      return;
    }
    this.options.update((options) => [...options, option]);
    this.currentInputValue.set('');
    this.form().setValue(['']);
  }
}
