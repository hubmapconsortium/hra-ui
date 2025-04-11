import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { VisualButtonComponent } from '@hra-ui/design-system/buttons/visual-button';
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
  imports: [CommonModule, MatIconModule, RouterModule, VisualButtonComponent],
  templateUrl: './long-card.component.html',
  styleUrl: './long-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongCardComponent {
  /** Long card component input */
  readonly spec = input.required<LongCardSpec>();

  /** Router */
  private readonly router = inject(Router);

  /** Long card component click event */
  onClick(): void {
    this.router.navigate(['/', this.spec().route]);
  }
}
