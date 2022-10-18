import { Component, Input } from '@angular/core';
import { TileItems } from './tile-items';
@Component({
  selector: 'ccf-simple-tile',
  templateUrl: './simple-tile.component.html',
  styleUrls: ['./simple-tile.component.scss']
})
export class SimpleTileComponent {

  @Input() definitions: TileItems[] = [];

}
