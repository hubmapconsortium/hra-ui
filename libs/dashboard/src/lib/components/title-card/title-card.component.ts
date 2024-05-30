import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { z } from 'zod';

export type TitleCardSpec = z.infer<typeof TITLE_CARD_DEF>;

export const TITLE_CARD_DEF = z.object({
  title: z.string(),
  tooltip: z.string(),
});

const TOOLTIP_POSITIONS: ConnectionPositionPair[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
  {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },
  {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
  },
];

@Component({
  selector: 'hra-title-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, OverlayModule],
  templateUrl: './title-card.component.html',
  styleUrl: './title-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
  readonly spec = input.required<TitleCardSpec>();
  readonly tooltipPositions = TOOLTIP_POSITIONS;

  tooltipOpen = false;
}
