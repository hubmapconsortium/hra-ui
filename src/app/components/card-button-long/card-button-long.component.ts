import { LongCard } from './long-card';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ccf-card-button-long',
  templateUrl: './card-button-long.component.html',
  styleUrls: ['./card-button-long.component.scss']
})
export class CardButtonLongComponent {

  @Input()
  longButtonItems: LongCard[];

  constructor() { }

}
