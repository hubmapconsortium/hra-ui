import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CountCardComponent } from '@hra-ui/design-system/cards/count-card';
import { SectionCardsComponent } from '../../components/section-cards/section-cards.component';
import { LandingPageData } from '../../schemas/landing-page/landing-page.schema';

/**
 * HRA landing page component
 */
@Component({
  selector: 'hra-landing-page',
  imports: [HraCommonModule, CarouselComponent, CountCardComponent, SectionCardsComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Data to display on the landing page */
  readonly data = input.required<LandingPageData>();
}
