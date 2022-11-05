import { Component, Input } from '@angular/core';
import { PrizeCard } from './prize-card';

@Component({
  selector: 'ccf-prize-card',
  templateUrl: './prize-card.component.html',
  styleUrls: ['./prize-card.component.scss']
})
export class PrizeCardComponent {
  @Input() prizeCard: PrizeCard[];
}
