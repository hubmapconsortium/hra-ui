import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tooltip {
  title?: string;
  description: string;
}
@Component({
  selector: 'hra-tooltip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip-card.component.html',
  styleUrl: './tooltip-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.small]': 'small() ? "" : null',
  },
})
export class TooltipCardComponent {
  info = input.required<Tooltip[]>();
  readonly small = input(false, { transform: booleanAttribute });
}
