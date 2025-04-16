import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';

import { CarouselComponent } from '../../components-v2/carousel/carousel.component';
import { CarouselItem } from '../../components-v2/carousel/carousel.schema';
import { CardInfo, CountInfoComponent } from '../../components-v2/count-info/count-info.component';
import { SectionCardsComponent } from '../../components-v2/section-cards/section-cards.component';
import { SectionCardItem } from '../../components-v2/section-cards/section-cards.schema';

/**
 * HRA landing page component
 */
@Component({
  selector: 'hra-landing-page',
  imports: [HraCommonModule, CarouselComponent, CountInfoComponent, SectionCardsComponent, PageSectionComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPageComponent {
  /** Carousel items data */
  readonly carouselItems = input.required<CarouselItem[]>();

  /** Count info data */
  readonly countInfo = input.required<CardInfo[]>();

  /** Section cards data */
  readonly sectionCardInfo = input.required<SectionCardItem[]>();
}
