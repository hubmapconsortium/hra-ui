import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/** A call to action bar that can be displayed at top of the page */
@Component({
  selector: 'hra-cta-bar',
  imports: [CommonModule, MatIconModule, ButtonsModule],
  templateUrl: './cta-bar.component.html',
  styleUrl: './cta-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaBarComponent {
  /** Action button text */
  readonly action = input.required<string>();
  /** Action description */
  readonly description = input.required<string>();
  /** Url to visit when action button is clicked */
  readonly url = input.required<string>();
  /** Emits when the close button is clicked */
  readonly closeClick = output();
}
