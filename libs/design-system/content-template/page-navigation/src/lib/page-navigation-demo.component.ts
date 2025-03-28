import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductLogoComponent } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageSectionComponent } from '@hra-ui/design-system/content-template/page-section';

import { PageNavigationComponent, Section } from './page-navigation.component';

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
 * Demo for page navigation feature
 */
@Component({
  selector: 'hra-page-navigation-demo',
  imports: [
    CommonModule,
    PageSectionComponent,
    ProductLogoComponent,
    MatIconModule,
    ButtonsModule,
    PageNavigationComponent,
  ],
  templateUrl: './page-navigation-demo.component.html',
  styleUrl: './page-navigation-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PageNavigationDemoComponent {
  /** Section data */
  readonly data: Section[] = TEST_SECTIONS;
}
