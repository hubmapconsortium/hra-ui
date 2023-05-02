import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';
import { LongCard } from '../../components/card-button-long/long-card';


@Component({
  selector: 'overview-tools',
  templateUrl: './overview-tools.component.html',
  styleUrls: ['./overview-tools.component.scss']
})
export class OverviewToolsComponent {
  data = this.route.snapshot.data['content'] as PageDef[];

  constructor(private router: Router, private readonly route: ActivatedRoute) { }

  clicked(card: LongCard): void {
    this.router.navigate([card.route])
  }
}
