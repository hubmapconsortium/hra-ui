import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';
import { CardBlock, LongCard } from '../../components/card-button-long/long-card';
import { TileDefinition } from '../../shared/simple-tile-items';


@Component({
  selector: 'overview-training-outreach',
  templateUrl: './overview-training-outreach.component.html',
  styleUrls: ['./overview-training-outreach.component.scss']
})
export class OverviewTrainingOutreachComponent {
  // title: string;
  // TileDefinition = TileDefinition;
  // longCardData: CardBlock[];

  data = this.route.snapshot.data['content'] as PageDef[];
  constructor(private router: Router, private readonly route: ActivatedRoute) { }

  clicked(card:LongCard):void{
    this.router.navigate([card.route])
  }
}
