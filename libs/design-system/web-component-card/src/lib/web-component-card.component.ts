import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-web-component-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-component-card.component.html',
  styleUrl: './web-component-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponentCardComponent {
  /** Image url */
  readonly imageUrl = input.required<string>();
  /** Product title */
  readonly productTitle = input.required<string>();
  /** Web Component Name */
  readonly webComponentName = input<string | undefined>(undefined); // optional
  /** Description */
  readonly description = input.required<string>();
}
