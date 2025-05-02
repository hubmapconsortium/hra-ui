import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';

import { CarouselComponent } from '../../components-v2/carousel/carousel.component';
import { CountInfoComponent } from '../../components-v2/count-info/count-info.component';
import { SectionCardsComponent } from '../../components-v2/section-cards/section-cards.component';
import { LandingPageData } from '../../resolvers/landing-page/landing-page.schema';

/**
 * HRA landing page component
 */
@Component({
  selector: 'hra-landing-page',
  imports: [HraCommonModule, CarouselComponent, CountInfoComponent, SectionCardsComponent, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Data to display on the landing page */
  readonly data = input.required<LandingPageData>();
}
