import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'hra-email-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FlexLayoutModule, MatCardModule],
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailInputComponent {
  isSubmitted = false;

  readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
  readonly subjectControl = new FormControl('', [Validators.required]);
  readonly messageControl = new FormControl('', [Validators.required]);
  @Output() submitClick = new EventEmitter<void>();

  @Input() successMessage = false;

  onSubmit() {
    // Do something when the button is submitted
    console.log('Clicked');
    this.isSubmitted = true;

    if (this.emailControl && this.subjectControl && this.messageControl) {
      console.log('Submitted All okay');
      this.isSubmitted = true;
    } else {
      console.log('UnSubmitted missing content');
      this.isSubmitted = true;
    }
  }
}
