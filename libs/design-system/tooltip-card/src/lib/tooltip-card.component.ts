import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Interface for Tooltip Card */
export interface Tooltip {
  /** Title of the card */
  title?: string;
  /** Description of the card */
  description: string;
}

/**
 * Tooltip Card component
 */
@Component({
  selector: 'hra-tooltip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip-card.component.html',
  styleUrl: './tooltip-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.small]': 'small()',
  },
})
export class TooltipCardComponent {
  /** Input for the card */
  info = input.required<Tooltip[]>();

  /** Flag to decide whether the card is small */
  readonly small = input(false, { transform: booleanAttribute });
}
