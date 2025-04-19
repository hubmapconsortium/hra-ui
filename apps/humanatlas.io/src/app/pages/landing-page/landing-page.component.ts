import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';

import { CarouselComponent } from '../../components-v2/carousel/carousel.component';
import { CountInfoComponent } from '../../components-v2/count-info/count-info.component';
import { SectionCardsComponent } from '../../components-v2/section-cards/section-cards.component';
import { LandingPageData } from '../../resolvers/landing-page/landing-page.schema';

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
  readonly data = input.required<LandingPageData>();
}
