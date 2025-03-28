import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductLogoComponent } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageNavigationComponent, Section } from '@hra-ui/design-system/content-template/page-navigation';
import { PageSectionComponent } from '@hra-ui/design-system/content-template/page-section';
import { NavigationModule } from '@hra-ui/design-system/navigation';

import { CarouselComponent } from './components-v2/carousel/carousel.component';
import { SectionCardsComponent } from './components-v2/section-cards/section-cards.component';

/** Test section data */
const TEST_SECTIONS: Section[] = [
  {
    name: 'Page label',
    children: [{ name: 'Page label 2' }, { name: 'Page label 3' }, { name: 'Page label 4' }],
  },
  {
    name: 'Page label 5',
    children: [
      {
        name: 'Page label 6',
        children: [{ name: 'Page label 7' }, { name: 'Page label 8' }],
      },
      {
        name: 'Page label 9',
        children: [{ name: 'Page label 10' }],
      },
    ],
  },
];

/**
 * Root component
 */
@Component({
  selector: 'ccf-root',
  imports: [
    CommonModule,
    NavigationModule,
    CarouselComponent,
    SectionCardsComponent,
    PageSectionComponent,
    ProductLogoComponent,
    MatIconModule,
    ButtonsModule,
    PageNavigationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'hra-app',
  },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  /** Data for sections */
  readonly data: Section[] = TEST_SECTIONS;

  /**
   * Returns window width in px
   */
  windowWidth() {
    return window.innerWidth;
  }
}
