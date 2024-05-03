import { LongCard } from './long-card';
import { Component, EventEmitter, Input, Output } from '@angular/core';

/** Displays a card to navigate to other pages or external links */
@Component({
  selector: 'ccf-card-button-long',
  templateUrl: './card-button-long.component.html',
  styleUrls: ['./card-button-long.component.scss'],
})
export class CardButtonLongComponent {
  /** Details to be displayed inside the card */
  @Input() longButtonItems: LongCard[] = [];

  /**Emits the card data when card is clicked */
  @Output() readonly cardRoutes = new EventEmitter<LongCard>();
}
