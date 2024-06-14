import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { z } from 'zod';

/** Type definition of Title Card */
export type TitleCardSpec = z.infer<typeof TITLE_CARD_DEF>;

/** Title card definition object */
export const TITLE_CARD_DEF = z.object({
  title: z.string(),
  tooltip: z.string(),
});

/** Tooltip positions definition */
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

/** Title card component, renders title, tooltip and contents inside the card */
@Component({
  selector: 'hra-title-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, OverlayModule],
  templateUrl: './title-card.component.html',
  styleUrl: './title-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
  /** Input for title card component */
  readonly spec = input.required<TitleCardSpec>();

  /** Setting the tooltip positions  */
  readonly tooltipPositions = TOOLTIP_POSITIONS;

  /** Flag to check if tooltip is open */
  tooltipOpen = false;
}
