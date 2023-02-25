import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmailInputComponent, RequiredTextboxComponent } from '@hra-ui/components/atoms';
import { produce } from 'immer';
import { MarkdownModule } from 'ngx-markdown';

export interface ContactData {
  email: string;
  subject: string;
  message: string;
}

const EMPTY_CONTACT_DATA: Partial<ContactData> = {
  email: undefined,
  subject: undefined,
  message: undefined,
};

/**
 * Contat modal component.
 */
@Component({
  selector: 'hra-contact-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    EmailInputComponent,
    MarkdownModule,
    RequiredTextboxComponent,
  ],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactModalComponent {
  /** Input for product logo URL to displayed on the left side. */
  @Input() productLogoUrl = '';

  /** Input for product title to displayed on the left side. */
  @Input() productTitle = '';

  /** Information modal message to the user. Displayed below the input fields.*/
  @Input() description = '';

  /** A label for the textarea field */
  @Input() messagelabel = '';

  /** Emits when the submit button is clicked and all the values are appropriate. */
  @Output() readonly submitClick = new EventEmitter<ContactData>();

  /** Emits when the cancel button or close icon is clicked */
  @Output() readonly closeClick = new EventEmitter<void>();

  /** A function to disable the submit button. If all the values are in approproiate format, then it will be enabled. */
  get disableSubmit(): boolean {
    return Object.values(this.contactData).some((value) => value === undefined);
  }

  /** Asigns the undefined initially to all the input fields. */
  contactData = EMPTY_CONTACT_DATA;

  /** Updates the contact data object with a new value for a given key. */
  updateData<K extends keyof ContactData>(key: K, value?: ContactData[K]): void {
    this.contactData = produce(this.contactData, (draft) => {
      draft[key] = value;
    });
  }

  /** It emits the updated value of contact data */
  submit(): void {
    this.submitClick.emit(this.contactData as ContactData);
  }
}
