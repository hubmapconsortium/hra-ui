import { TileDefinition } from './../../shared/simple-tile-items';
import { Component } from '@angular/core';
import { longButtonItems, pageTitle } from './overview-data.content';
import { Router } from '@angular/router';
import { LongCard } from 'src/app/components/card-button-long/long-card';

@Component({
  selector: 'ccf-overview-data',
  templateUrl: './overview-data.component.html',
  styleUrls: ['./overview-data.component.scss']
})
export class OverviewDataComponent {

  constructor(private router: Router) { }
  pageTitle = pageTitle;
  description = TileDefinition
  longButtonItems = longButtonItems

  clicked(card: LongCard): void {
    this.router.navigate([card.route])
  }
}
