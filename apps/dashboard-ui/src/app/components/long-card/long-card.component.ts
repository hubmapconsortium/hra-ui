import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

export interface LongCard {
  /** Image for the card */
  image: string;
  /** Label for the card */
  label: string;
  /** Route for the card */
  route: string;
  /** Alternate text for the card image */
  alt: string;
}
/**
 * Long Card Component
 */
@Component({
  selector: 'hra-long-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './long-card.component.html',
  styleUrl: './long-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongCardComponent {
  /** Input for the card(s) */
  cardData = input.required<LongCard[]>();
}
