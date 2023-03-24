import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountInfoCard } from 'src/app/components/count-info-card/count-info-card';
import { Announcement } from '../../components/announcement-card/announcement-card';
import { SliderItems } from '../../components/carousel/slider-items';
import { SectionCardItems } from '../../components/section-card/section-card-items';
import { TileDefinition } from '../../shared/simple-tile-items';


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
  countCardData: CountInfoCard[];

  constructor(route: ActivatedRoute) { 
    const data = route.snapshot.data['content'];
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.cardsHeading = data.cardsHeading;
    this.carouselInfo = data.carouselInfo;
    this.cards = data.cards;
    this.messages = data.messages;
    this.countCardData = data.countCardData;
  }
}
