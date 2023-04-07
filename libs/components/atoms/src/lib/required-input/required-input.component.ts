import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { injectDestroy$ } from '@hra-ui/cdk/injectors';
import { map, takeUntil } from 'rxjs';

/**
 * A reusable text field component that can be used to input text.
 * This input field component also had required validation check.
 */
@Component({
  selector: 'hra-required-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './required-input.component.html',
  styleUrls: ['./required-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredInputComponent {
  /**
   * The label to display for the text field.
   */
  @Input() label = '';

  /**
   * An event emitter that emits the input value when it changes.
   */
  @Output() readonly inputChange = new EventEmitter<string | undefined>();

  /**
   * Destroy observable used to control the lifetime of other observables.
   */
  readonly destroy$ = injectDestroy$();

  /**
   * Form control for input to set some input validation.
   */
  readonly control = new FormControl('', {
    updateOn: 'blur',
    validators: Validators.required,
  });

  /**
   * Creates an instance of required input component
   * and it connect the form control value changes to check for validation
   * before output emmiter is triggered
   */
  constructor() {
    const { control, destroy$, inputChange } = this;
    control.valueChanges
      .pipe(
        takeUntil(destroy$),
        map((value) => (control.valid ? (value as string) : undefined))
      )
      .subscribe(inputChange);
  }
}
