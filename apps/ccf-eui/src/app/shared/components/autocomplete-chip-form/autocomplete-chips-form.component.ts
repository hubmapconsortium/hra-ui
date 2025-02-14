import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

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
    const currentAssay = this.currentInputValue().toLowerCase();
    return currentAssay
      ? this.filterOptions().filter((assay) => assay.toLowerCase().includes(currentAssay))
      : this.filterOptions().slice();
  });

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.options.update((option) => [...option, value]);
    }
    this.currentInputValue.set('');
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

  selected(event: MatAutocompleteSelectedEvent): void {
    this.options.update((options) => [...options, event.option.viewValue]);
    this.currentInputValue.set('');
    this.form().setValue(['']);
    event.option.deselect();
  }
}
