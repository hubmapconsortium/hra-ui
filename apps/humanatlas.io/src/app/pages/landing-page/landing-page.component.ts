import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';

import { PageDef } from '../../app.routes';
import { CarouselComponent } from '../../components-v2/carousel/carousel.component';
import { CountInfoComponent } from '../../components-v2/count-info/count-info.component';
import { SectionCardsComponent } from '../../components-v2/section-cards/section-cards.component';

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
  /** Data to display on the landing page */
  readonly data = input.required<PageDef[]>();

  /** Landing page data converted to the correct format */
  readonly computedData = computed(() => {
    return {
      carouselItems: this.data()[0]['carouselItems'],
      countInfo: this.data()[1]['countInfo'],
      sectionCardInfo: this.data()[2]['sectionCardInfo'],
    };
  });
}
