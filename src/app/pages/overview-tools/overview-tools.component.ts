import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LongCard } from 'src/app/components/card-button-long/long-card';
import { TILE_DEFINITION } from 'src/app/shared/simple-tile-items';
import { longButtonItems } from './overview-tools.content';

@Component({
  selector: 'ccf-overview-tools',
  templateUrl: './overview-tools.component.html',
  styleUrls: ['./overview-tools.component.scss']
})
export class OverviewToolsComponent {

  constructor(private router: Router) { }

  pageTitle = 'Human Reference Atlas Tools'
  descriptions = TILE_DEFINITION;
  longButtonItems = longButtonItems

  clicked(card: LongCard): void {
    this.router.navigate([card.route])
  }

}
