import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';

import { CarouselComponent } from '../../components-v2/carousel/carousel.component';
import { CountInfoComponent } from '../../components-v2/count-info/count-info.component';
import { SectionCardsComponent } from '../../components-v2/section-cards/section-cards.component';
import { RouterModule } from '@angular/router';

/**
 * HRA landing page component
 */
@Component({
  selector: 'hra-landing-page',
  imports: [
    HraCommonModule,
    CarouselComponent,
    CountInfoComponent,
    SectionCardsComponent,
    PageSectionComponent,
    RouterModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPageComponent {}
