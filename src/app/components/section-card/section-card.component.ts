import { SectionCardItems } from './section-card-items';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ccf-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent {

  @Input()
  public cards: SectionCardItems[] = [];

  constructor() {
  }
}
