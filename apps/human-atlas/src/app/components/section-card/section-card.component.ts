import { SectionCardItems } from './section-card-items';
import { Component, Input } from '@angular/core';

/** Displays a card to navigate to other pages */
@Component({
  selector: 'ccf-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
})
export class SectionCardComponent {
  /** Details to be displayed inside the card */
  @Input() public cards: SectionCardItems[] = [];
}
