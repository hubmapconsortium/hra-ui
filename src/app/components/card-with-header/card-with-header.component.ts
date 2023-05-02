import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBlock, LongCard } from '../card-button-long/long-card';

@Component({
  selector: 'card-with-header',
  templateUrl: './card-with-header.component.html',
  styleUrls: ['./card-with-header.component.scss']
})
export class CardWithHeaderComponent {
  @Input() cardBlockData: CardBlock[];

  constructor(private router: Router, route: ActivatedRoute) { }

  clicked(card: LongCard): void {
    this.router.navigate([card.route])
  }
}
