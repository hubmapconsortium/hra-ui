import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBlock, LongCard } from '../card-button-long/long-card';

@Component({
  selector: 'card-with-header',
  templateUrl: './card-with-header.component.html',
  styleUrls: ['./card-with-header.component.scss'],
})
export class CardWithHeaderComponent {
  @Input() cardBlockData: CardBlock[];

  readonly router = inject(Router);
}
