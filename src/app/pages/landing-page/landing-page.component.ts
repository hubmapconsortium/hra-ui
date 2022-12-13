import { TileDefinition } from './../../shared/simple-tile-items';
import { Component } from '@angular/core';
import { title, subtitle, cardsHeading, carouselInfo, cards } from './landing-page.content';
import { ActivatedRoute } from '@angular/router';
import { SliderItems } from 'src/app/components/carousel/slider-items';
import { SectionCardItems } from 'src/app/components/section-card/section-card-items';

@Component({
  selector: 'ccf-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  title: string;
  subtitle: string;
  cardsHeading: string;
  definitions = TileDefinition
  carouselInfo: SliderItems[]
  cards: SectionCardItems[]

  constructor(private route: ActivatedRoute) { 
    const data = route.snapshot.data['landingPage']
    this.title = data.title
    this.subtitle = data.subtitle
    this.cardsHeading = data.cardsHeading
    this.carouselInfo = data.carouselInfo
    this.cards = data.cards
  }

}
