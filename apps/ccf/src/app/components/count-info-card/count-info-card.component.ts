import { Component, Input, OnInit } from '@angular/core';
import { CountInfoCard } from './count-info-card';

/** Displays a card to navigate to other pages or external links */
@Component({
  selector: 'count-info-card',
  templateUrl: './count-info-card.component.html',
  styleUrls: ['./count-info-card.component.scss'],
})
export class CountInfoCardComponent {
  /** Metrics and other details to be displayed inside the card */
  @Input() cardInformation: CountInfoCard[];
}
