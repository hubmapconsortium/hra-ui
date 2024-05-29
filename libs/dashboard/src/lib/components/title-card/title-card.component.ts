import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { z } from 'zod';
import { MatIconModule } from '@angular/material/icon';

export type TitleCardSpec = z.infer<typeof TITLE_CARD_DEF>;

export const TITLE_CARD_DEF = z.object({
  title: z.string(),
  tooltip: z.string(),
});

@Component({
  selector: 'hra-title-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './title-card.component.html',
  styleUrl: './title-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
  readonly spec = input.required<TitleCardSpec>();
}
