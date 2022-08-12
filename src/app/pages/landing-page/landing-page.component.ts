import { TILE_DEFINITION } from './../../shared/simple-tile-items';
import { Component, OnInit } from '@angular/core';
import { title, subtitle, cardsHeading, carouselInfo, cards } from './landing-page.content';

@Component({
  selector: 'ccf-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  title = title;
  subtitle = subtitle
  cardsHeading = cardsHeading

  definitions = TILE_DEFINITION
  carouselInfo = carouselInfo
  cards = cards

  constructor() { }

}
