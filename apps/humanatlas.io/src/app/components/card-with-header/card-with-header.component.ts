import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardBlock } from '../card-button-long/long-card';

/** Displays a card to navigate to other pages or external links along with a title */
@Component({
  selector: 'card-with-header',
  templateUrl: './card-with-header.component.html',
  styleUrls: ['./card-with-header.component.scss'],
  standalone: false,
})
export class CardWithHeaderComponent {
  /** Title and details to be displayed inside the card */
  @Input() cardBlockData: CardBlock[] = [];

  /** Reference to the Router */
  readonly router = inject(Router);
}
