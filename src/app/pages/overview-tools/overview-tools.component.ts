import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LongCard } from '../../components/card-button-long/long-card';
import { Overview } from '../overview-data/overview-data.component';


@Component({
  selector: 'overview-tools',
  templateUrl: './overview-tools.component.html',
  styleUrls: ['./overview-tools.component.scss']
})
export class OverviewToolsComponent {
  data = this.route.snapshot.data['content'] as Overview;

  pageTitle = this.data.pageTitle;
  description = this.data.description;
  longButtonItems = this.data.longButtonItems;

  constructor(private router: Router, private readonly route: ActivatedRoute) { }

  clicked(card: LongCard): void {
    this.router.navigate([card.route])
  }
}
