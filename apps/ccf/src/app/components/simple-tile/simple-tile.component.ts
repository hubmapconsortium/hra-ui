import { Component, Input } from '@angular/core';
import { TileItems } from './tile-items';

/** Displays an outlined card with a description inside */
@Component({
  selector: 'ccf-simple-tile',
  templateUrl: './simple-tile.component.html',
  styleUrls: ['./simple-tile.component.scss'],
})
export class SimpleTileComponent {
  /** Message to be shown in the card */
  @Input() definitions: TileItems[] = [];
}
