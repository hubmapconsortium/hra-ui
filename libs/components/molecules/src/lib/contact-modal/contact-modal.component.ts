import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInputComponent } from '@hra-ui/components/atoms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'hra-contact-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, EmailInputComponent],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactModalComponent {
  @Input() placeHolder = 'Enter Email Here';
  /**
   * Input for product logo URL to displayed on the left side.
   */
  @Input() productLogoUrl = '';

  /**
   * Input for product title to displayed on the left side.
   */
  @Input() productTitle = '';

  @Output() emailChange = new EventEmitter<string | null>();

  email(event: string | null) {
    console.log(event);
    this.emailChange.emit(event);
  }
}
