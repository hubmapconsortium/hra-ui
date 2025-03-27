import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { z } from 'zod';

/** Long card data */
export type LongCardSpec = z.infer<typeof LONG_CARD_DEF>;

/** Zod Object definition for the long card */
export const LONG_CARD_DEF = z.object({
  title: z.string(),
  route: z.string(),
  background: z.string().url(),
});

/**
 * Long Card Component
 */
@Component({
  selector: 'hra-long-card',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './long-card.component.html',
  styleUrl: './long-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongCardComponent {
  /** Long card component input */
  readonly spec = input.required<LongCardSpec>();
}
