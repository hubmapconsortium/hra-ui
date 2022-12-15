import { TileDefinition } from './../../shared/simple-tile-items';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SliderItems } from 'src/app/components/carousel/slider-items';
import { SectionCardItems } from 'src/app/components/section-card/section-card-items';
import { Announcement } from 'src/app/components/announcement-card/announcement-card';

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
  messages: Announcement[];

  constructor(private route: ActivatedRoute) { 
    const data = route.snapshot.data['landingPage']
    this.title = data.title
    this.subtitle = data.subtitle
    this.cardsHeading = data.cardsHeading
    this.carouselInfo = data.carouselInfo
    this.cards = data.cards
    this.messages = data.messages
  }

}
