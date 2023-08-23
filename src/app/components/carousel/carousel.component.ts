import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Pagination, Navigation, SwiperOptions, EffectFade } from "swiper";
import { SliderItems } from './slider-items';

SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);


@Component({
  selector: 'ccf-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent {
  @Input() carouselInfo: SliderItems[] = []

  @Output() readonly buttonRoute = new EventEmitter<SliderItems>;

  readonly config: SwiperOptions = {
    autoplay: {
      delay: 10000,
      disableOnInteraction: false
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: true,
    pagination: {
      enabled: true,
      clickable: true
    },
    resizeObserver: false,
    rewind: true,
  };
}
