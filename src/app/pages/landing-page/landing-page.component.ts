import { TILE_DEFINITION } from './../../shared/simple-tile-items';
import { Component } from '@angular/core';
import { title, subtitle, cardsHeading, carouselInfo, cards } from './landing-page.content';
import { Router } from '@angular/router';

@Component({
  selector: 'ccf-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  constructor(private router: Router) { }

  title = title;
  subtitle = subtitle
  cardsHeading = cardsHeading

  definitions = TILE_DEFINITION
  carouselInfo = carouselInfo
  cards = cards

  routeTo(card: any): void {
    this.router.navigate([card.route])
  }

}
