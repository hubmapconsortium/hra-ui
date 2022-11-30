import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LongCard } from 'src/app/components/card-button-long/long-card';
import { TileDefinition } from 'src/app/shared/simple-tile-items';
import { longCardData } from './overview-training-outreach.content';

@Component({
  selector: 'overview-training-outreach',
  templateUrl: './overview-training-outreach.component.html',
  styleUrls: ['./overview-training-outreach.component.scss']
})
export class OverviewTrainingOutreachComponent {

  constructor(private router: Router) { }

  title = "Human Reference Atlas Training & Outreach";
  TileDefinition = TileDefinition
  longCardData = longCardData

  route(card:LongCard):void{
    this.router.navigate([card.route])
  }

}
