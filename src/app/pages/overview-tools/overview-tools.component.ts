import { Component } from '@angular/core';
import { TILE_DEFINITION } from 'src/app/shared/simple-tile-items';
import { longButtonItems } from './overview-tools.content';

@Component({
  selector: 'ccf-overview-tools',
  templateUrl: './overview-tools.component.html',
  styleUrls: ['./overview-tools.component.scss']
})
export class OverviewToolsComponent {

  pageTitle = 'Human Reference Atlas Tools'
  descriptions = TILE_DEFINITION;
  longButtonItems = longButtonItems

}
