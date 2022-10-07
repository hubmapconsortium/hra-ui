import { Component } from '@angular/core';
import { TILE_DEFINITION } from 'src/app/shared/simple-tile-items';
import { longCardData } from './overview-training-outreach.content';

@Component({
  selector: 'ccf-overview-training-outreach',
  templateUrl: './overview-training-outreach.component.html',
  styleUrls: ['./overview-training-outreach.component.scss']
})
export class OverviewTrainingOutreachComponent {

  title = "Human Reference Atlas Training & Outreach";
  TILE_DEFINITION = TILE_DEFINITION
  longCardData = longCardData
  
}
