import { Component, Input } from '@angular/core';
import { PrizeCard } from './prize-card';

/** Displays details of prize winners inside a card */
@Component({
  selector: 'ccf-prize-card',
  templateUrl: './prize-card.component.html',
  styleUrls: ['./prize-card.component.scss'],
  standalone: false,
})
export class PrizeCardComponent {
  /** Details to be displayed inside the card */
  @Input() prizeCard: PrizeCard[] = [];
}
