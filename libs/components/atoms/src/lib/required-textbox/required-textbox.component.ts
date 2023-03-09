import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectOnDestroy } from '@hra-ui/cdk/injectors';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { map, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * The required textbox component displays a message box for users to add a message
 */
@Component({
  selector: 'hra-required-textbox',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './required-textbox.component.html',
  styleUrls: ['./required-textbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredTextboxComponent {
  /** A placeholder for the message textarea field */
  @Input() placeholder = '';

  /** A label for the textarea field */
  @Input() label = '';

  /** Emits the new message when the input changes or undefined if the message is invalid  */
  @Output() readonly messageChange = new EventEmitter<string | undefined>();

  /** Observable emitting when the component is destroyed */
  readonly destroy$ = injectOnDestroy();

  /**  A control to validate if the message field is empty */
  readonly control = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required],
  });

  /** Connects the input control to component outputs */
  constructor() {
    const { control, destroy$ } = this;
    control.valueChanges
      .pipe(
        takeUntil(destroy$),
        map((value) => (control.valid ? value : undefined))
      )
      .subscribe((value) => this.messageChange.emit(value as string | undefined));
  }
}
