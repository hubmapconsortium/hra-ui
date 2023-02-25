import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * A reusable text field component that can be used to input text.
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
   * The error message to display if the input is invalid.
   */
  @Input() error = '';

  /**
   * Input Value  of required input component
   */
  @Input() inputValue = '';

  /**
   * An event emitter that emits the input value when it changes.
   */
  @Output() inputChanged = new EventEmitter<string>();

  /**
   * Form control of required input component
   */
  formControl = new FormControl(this.inputValue, Validators.required);
}
