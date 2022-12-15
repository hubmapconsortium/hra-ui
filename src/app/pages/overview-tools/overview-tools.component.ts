import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LongCard } from '../../components/card-button-long/long-card';
import { TileItems } from '../../components/simple-tile/tile-items';


@Component({
  selector: 'overview-tools',
  templateUrl: './overview-tools.component.html',
  styleUrls: ['./overview-tools.component.scss']
})
export class OverviewToolsComponent {
  pageTitle: string;
  description: TileItems[];
  longButtonItems: LongCard[];

  constructor(private router: Router, route: ActivatedRoute) { 
    const data = route.snapshot.data['overviewTools'];
    this.pageTitle = data.pageTitle;
    this.description = data.description;
    this.longButtonItems = data.longButtonItems;
  }

  clicked(card: LongCard): void {
    this.router.navigate([card.route])
  }
}
