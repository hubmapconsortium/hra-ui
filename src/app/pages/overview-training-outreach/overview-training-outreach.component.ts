import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LongCard } from 'src/app/components/card-button-long/long-card';
import { TileDefinition } from 'src/app/shared/simple-tile-items';
import { CardBlock, longCardData } from './overview-training-outreach.content';

@Component({
  selector: 'overview-training-outreach',
  templateUrl: './overview-training-outreach.component.html',
  styleUrls: ['./overview-training-outreach.component.scss']
})
export class OverviewTrainingOutreachComponent {

  constructor(private router: Router, private _route: ActivatedRoute) { 
    const data = _route.snapshot.data['overviewTrainingOutreach']
    this.title = data.title
    this.longCardData = data.longCardData
  }

  title: string;
  TileDefinition = TileDefinition
  longCardData: CardBlock[]

  route(card:LongCard):void{
    this.router.navigate([card.route])
  }

}
