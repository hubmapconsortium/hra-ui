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
  /** Input for email place holder, it will be displayed in email text box. */
  @Input() placeHolder = '';

  /** Input for product logo URL to displayed on the left side. */
  @Input() productLogoUrl = '';

  /** Input for product title to displayed on the left side. */
  @Input() productTitle = '';

  /** Information modal message to the user */
  @Input() description = '';

  /** A placeholder for the message textarea field */
  @Input() messageplaceholder = '';

  /** A label for the textarea field */
  @Input() label = '';

  @Output() readonly submitClick = new EventEmitter<ContactData>();

  /** Emits when the close icon is clicked */
  @Output() readonly closeClick = new EventEmitter<void>();

  get disableSubmit(): boolean {
    return Object.values(this.contactData).some((value) => value === undefined);
  }

  contactData = EMPTY_CONTACT_DATA;

  updateData<K extends keyof ContactData>(key: K, value?: ContactData[K]): void {
    this.contactData = produce(this.contactData, (draft) => {
      draft[key] = value;
    });
  }

  submit(): void {
    if (this.disableSubmit === false) {
      console.log(this.contactData);
      this.submitClick.emit(this.contactData as ContactData);
    }
    console.log(this.disableSubmit);
  }

  // email(event: string | null) {
  //   console.log(event);
  //   this.emailChange.emit(event);
  // }

  // message(event: string | null) {
  //   console.log(event);
  //   this.messageChange.emit(event);
  // }
}
