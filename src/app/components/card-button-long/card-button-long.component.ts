import { LongCard } from './long-card';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ccf-card-button-long',
  templateUrl: './card-button-long.component.html',
  styleUrls: ['./card-button-long.component.scss']
})
export class CardButtonLongComponent {

  @Input()
  longButtonItems: LongCard[];

  @Output() cardRoutes = new EventEmitter<LongCard>;

}
