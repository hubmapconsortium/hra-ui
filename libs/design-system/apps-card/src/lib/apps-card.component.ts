import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Apps Card Component */
@Component({
  selector: 'hra-apps-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apps-card.component.html',
  styleUrl: './apps-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppsCardComponent {
  /** URL for the icon */
  readonly icon = input.required<string>();
  /** Title of the card */
  readonly title = input.required<string>();
  /** Description of the card */
  readonly description = input.required<string>();
  /** Link of the card */
  readonly link = input.required<string>();
}
