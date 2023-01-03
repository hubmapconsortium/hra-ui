import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBlock, LongCard } from '../../components/card-button-long/long-card';
import { TileDefinition } from '../../shared/simple-tile-items';


@Component({
  selector: 'overview-training-outreach',
  templateUrl: './overview-training-outreach.component.html',
  styleUrls: ['./overview-training-outreach.component.scss']
})
export class OverviewTrainingOutreachComponent {
  title: string;
  TileDefinition = TileDefinition;
  longCardData: CardBlock[];

  constructor(private router: Router, route: ActivatedRoute) { 
    const data = route.snapshot.data['content'];
    this.title = data.title;
    this.longCardData = data.longCardData;
  }

  clicked(card:LongCard):void{
    this.router.navigate([card.route])
  }
}
