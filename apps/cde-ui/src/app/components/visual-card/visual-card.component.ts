import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

/**
 * Interface for the visual card
 */
export interface VisualCard {
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
 * VisualCard Component
 */
@Component({
  selector: 'cde-visual-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './visual-card.component.html',
  styleUrl: './visual-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualCardComponent {
  /** Input for the card(s) */
  cardData = input.required<VisualCard[]>();
}
