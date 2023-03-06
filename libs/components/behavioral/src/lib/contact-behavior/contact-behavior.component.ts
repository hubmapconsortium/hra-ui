import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactModalComponent, InfoModalComponent } from '@hra-ui/components/molecules';

@Component({
  selector: 'ftu-contact-behavior',
  standalone: true,
  imports: [CommonModule, ContactModalComponent, InfoModalComponent],
  templateUrl: './contact-behavior.component.html',
  styleUrls: ['./contact-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactBehaviorComponent {
  /** This variable is used to determine form is submitted ot not. */
  isSubmitted = false;

  /** Input for product logo URL to displayed on the left side. */
  @Input() productLogoUrl = '';

  /** Input for product title to displayed on the left side. */
  @Input() productTitle = '';

  /** Information modal message to the user */
  @Input() description = '';

  onSubmit() {
    // Do something when the button is submitted
    console.log('Clicked : ' + this.isSubmitted);
    this.isSubmitted = true;
    console.log(this.isSubmitted);
  }
}
