import { TileDefinition } from './../../shared/simple-tile-items';
import { Component } from '@angular/core';
import { longButtonItems, pageTitle } from './overview-data.content';
import { ActivatedRoute, Router } from '@angular/router';
import { LongCard } from 'src/app/components/card-button-long/long-card';
import { TileItems } from 'src/app/components/simple-tile/tile-items';

@Component({
  selector: 'overview-data',
  templateUrl: './overview-data.component.html',
  styleUrls: ['./overview-data.component.scss']
})
export class OverviewDataComponent {

  pageTitle: string
  description: TileItems[]
  longButtonItems: LongCard[]


  constructor(private router: Router, private route: ActivatedRoute) { 
    const data = route.snapshot.data['overViewData']
    this.pageTitle = data.pageTitle
    this.description = data.description
    this.longButtonItems = data.longButtonItems
  }

  clicked(card: LongCard): void {
    this.router.navigate([card.route])
  }
}
