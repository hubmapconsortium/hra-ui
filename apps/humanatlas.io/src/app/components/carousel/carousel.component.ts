import { Component, Input, ViewEncapsulation } from '@angular/core';
// import SwiperCore, { Autoplay, Pagination, Navigation, SwiperOptions, EffectFade } from 'swiper';
import { SliderItems } from './slider-items';

// SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);

/** Displays a carousel */
@Component({
  selector: 'ccf-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class CarouselComponent {
  /** Details of slides to be displayed inside the carousel */
  @Input() carouselInfo: SliderItems[] = [];

  // /** Configuration of carousel behaivour */
  // readonly config: SwiperOptions = {
  //   autoplay: {
  //     delay: 10000,
  //     disableOnInteraction: false,
  //   },
  //   effect: 'fade',
  //   fadeEffect: {
  //     crossFade: true,
  //   },
  //   navigation: true,
  //   pagination: {
  //     enabled: true,
  //     clickable: true,
  //   },
  //   resizeObserver: false,
  //   rewind: true,
  // };
}
