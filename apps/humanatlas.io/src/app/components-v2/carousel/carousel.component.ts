import { coerceElement } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

import { SWIPER_INIT } from '../../utils/swiper';
import { CarouselItem } from './carousel.schema';
import { ControlsComponent } from './controls/controls.component';

const testItems: CarouselItem[] = [
  {
    tagline: 'Map the human body at single cell resolution',
    description: 'Read our flagship paper about the thousands of experts building a Human Reference Atlas.',
    imageSrc: 'assets/images/carousel1.svg',
    action: 'View Paper',
    link: { url: 'https://doi.org/10.1038/s41556-021-00788-6' },
  },
  {
    tagline: 'Contribute data to the Human Reference Atlas',
    description: 'Use the ASCT+B Reporter tool to explore data in the context of the Human Reference Atlas.',
    imageSrc: 'assets/images/carousel3.svg',
    action: 'Learn More',
    link: { route: 'asctb-reporter' },
  },
  {
    tagline: 'Learn more about the Human BioMolecular Atlas Program',
    description: 'Explore HuBMAP data, code, and documentation using the HuBMAP Data Portal.',
    imageSrc: 'assets/images/carousel6.svg',
    action: 'HuBMAP Data Portal',
    link: { url: 'https://portal.hubmapconsortium.org/' },
  },
  {
    tagline: 'Learn more about the Cellular Senescence Network (SenNet) Program',
    description: 'Explore SenNet data, code, and documentation using the SenNet Data Portal.',
    imageSrc: 'assets/images/carousel_sennet.svg',
    action: 'SenNet Data Portal',
    link: { url: 'https://data.sennetconsortium.org/' },
  },
];

@Component({
  selector: 'hra-carousel',
  imports: [CommonModule, MatIconModule, ButtonsModule, ControlsComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {
  readonly carouselInfo = input<CarouselItem[]>(testItems);

  private readonly swiper = viewChild.required<ElementRef<SwiperContainer>>('swiper');
  private readonly controls = viewChild.required(ControlsComponent);

  private readonly params = computed(
    (): SwiperOptions => ({
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        prevEl: coerceElement(this.controls().prevButton()),
        nextEl: coerceElement(this.controls().nextButton()),
      },
      pagination: {
        enabled: true,
        clickable: true,
        el: coerceElement(this.controls().paginationContainer()),
      },
      resizeObserver: false,
      rewind: true,
    }),
  );

  constructor() {
    inject(SWIPER_INIT)();

    effect(() => {
      const swiperEl = coerceElement(this.swiper());
      Object.assign(swiperEl, this.params());
      swiperEl.initialize();
    });
  }

  getLink(item: CarouselItem): string {
    const link = item.link;
    return 'url' in link ? link.url : link.route;
  }

  getLinkType(item: CarouselItem): string {
    const link = item.link;
    return 'url' in link ? 'url' : 'route';
  }
}
