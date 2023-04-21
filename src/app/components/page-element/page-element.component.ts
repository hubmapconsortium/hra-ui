import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LongCard } from '../card-button-long/long-card';
import { PageDef } from './page-def';

@Component({
  selector: 'page-element',
  templateUrl: './page-element.component.html',
  styleUrls: ['./page-element.component.scss']
})
export class PageElementComponent {
  @Input() def: PageDef;

  constructor(private router: Router, private readonly route: ActivatedRoute) { }

  clicked(card: LongCard): void {
    this.router.navigate([card.route])
  }
}
