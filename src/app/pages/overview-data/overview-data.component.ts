import { TileDefinition } from './../../shared/simple-tile-items';
import { Component } from '@angular/core';
import { longButtonItems, pageTitle } from './overview-data.content';
import { ActivatedRoute, Router } from '@angular/router';
import { LongCard } from 'src/app/components/card-button-long/long-card';

@Component({
  selector: 'overview-data',
  templateUrl: './overview-data.component.html',
  styleUrls: ['./overview-data.component.scss']
})
export class OverviewDataComponent {

  pageTitle: string;
  longButtonItems: LongCard[]

  constructor(private router: Router, route: ActivatedRoute) {
    const data = route.snapshot.data['overviewData'];
    this.pageTitle = data.pageTitle;
    this.longButtonItems = data.longButtonItems;
  }
  description = TileDefinition

  clicked(card: LongCard): void {
    this.router.navigate([card.route])
  }
}
