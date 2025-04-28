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
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

import { SWIPER_INIT } from '../../utils/swiper';
import { CarouselItem } from './carousel.schema';
import { ContentComponent } from './content/content.component';
import { ControlsComponent } from './controls/controls.component';

/**
 * Carousel component for displaying slides
 */
@Component({
  selector: 'hra-carousel',
  imports: [CommonModule, ControlsComponent, ContentComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {
  /** Details of slides to be displayed inside the carousel */
  readonly items = input.required<CarouselItem[]>();

  /** Reference to swiper element */
  private readonly swiper = viewChild.required<ElementRef<SwiperContainer>>('swiper');
  /** Reference to swiper controls element */
  private readonly controls = viewChild.required(ControlsComponent);

  /** Swiper config settings */
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

  /**
   * Injects SWIPER_INIT injection token, initializes swiper with config
   */
  constructor() {
    inject(SWIPER_INIT)();

    effect(() => {
      const swiperEl = coerceElement(this.swiper());
      Object.assign(swiperEl, this.params());
      swiperEl.initialize();
    });
  }
}
