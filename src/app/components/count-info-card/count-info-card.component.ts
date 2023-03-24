import { Component, Input, OnInit } from '@angular/core';
import { CountInfoCard } from './count-info-card';

@Component({
  selector: 'count-info-card',
  templateUrl: './count-info-card.component.html',
  styleUrls: ['./count-info-card.component.scss']
})
export class CountInfoCardComponent {
  @Input() cardInformation: CountInfoCard[];
}
