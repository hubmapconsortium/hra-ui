import { Component } from '@angular/core';
import { TILE_DEFINITION } from 'src/app/shared/simple-tile-items';
import { longButtonItems } from './overview-tools.content';

@Component({
  selector: 'overview-tools',
  templateUrl: './overview-tools.component.html',
  styleUrls: ['./overview-tools.component.scss']
})
export class OverviewToolsComponent  {

  descriptions = TILE_DEFINITION;
  longButtonItems = longButtonItems

}
