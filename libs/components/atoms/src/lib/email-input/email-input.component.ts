import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { injectDestroy$ } from '@hra-ui/cdk/injectors';
import { map, takeUntil } from 'rxjs';

/**
 * Email input components for contact modal.
 */
@Component({
  selector: 'hra-email-input',
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailInputComponent implements OnChanges {
  /** A placeholder for the email input field. This will be disappeared when the email is typed. */
  @Input() placeholder = '';

  /** Default email address */
  @Input() defaultMail = '';

  /** Emits the new email when the input changes or undefined if the email is invalid  */
  @Output() readonly emailChange = new EventEmitter<string | undefined>();

  /** Observable emitting when the component is destroyed */
  readonly destroy$ = injectDestroy$();

  /**  A control to validate the email. */
  readonly control = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.email],
  });

  /** Connects the input control to component outputs */
  constructor() {
    const { control, destroy$ } = this;
    control.valueChanges
      .pipe(
        takeUntil(destroy$),
        map((value) => (control.valid ? value : undefined)),
      )
      .subscribe((value) => this.emailChange.emit(value as string | undefined));
  }

  /** Sets the value to default email if provided */
  ngOnChanges(changes: SimpleChanges) {
    if ('defaultMail' in changes) {
      this.control.setValue(this.defaultMail);
    }
  }
}
