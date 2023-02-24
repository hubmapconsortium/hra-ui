import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInputComponent } from '@hra-ui/components/atoms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';

/**
 * Contat modal component.
 */
@Component({
  selector: 'hra-contact-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, EmailInputComponent, MarkdownModule],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactModalComponent {
  /** Input for email place holder, it will be displayed in email text box. */
  @Input() placeHolder = 'Enter Email Here';

  /** Input for product logo URL to displayed on the left side. */
  @Input() productLogoUrl = '';

  /** Input for product title to displayed on the left side. */
  @Input() productTitle = '';

  /** Information modal message to the user */
  @Input() description = '';

  /** Emits the new email when the input changes or null if the email is invalid  */
  @Output() emailChange = new EventEmitter<string | null>();

  /** Emits when the close icon is clicked */
  @Output() readonly closeClick = new EventEmitter<void>();

  email(event: string | null) {
    console.log(event);
    this.emailChange.emit(event);
  }
}
