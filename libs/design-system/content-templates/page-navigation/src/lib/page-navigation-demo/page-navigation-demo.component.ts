import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';

import { PageNavigationComponent, Section } from '../page-navigation/page-navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageLabelComponent } from '@hra-ui/design-system/content-templates/page-label';

/** Test section data */
const TEST_SECTIONS: Section[] = [
  {
    name: 'Section label in sentence case 1',
    children: [
      {
        name: 'Section label in sentence case 2',
        children: [
          {
            name: 'Section label in sentence case 3',
            children: [
              {
                name: 'Section label in sentence case 4',
                children: [
                  {
                    name: 'Section label in sentence case 5',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Section label in sentence case 6',
    children: [
      {
        name: 'Section label in sentence case 7',
      },
      {
        name: 'Section label in sentence case 8',
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
    HraCommonModule,
    PageSectionComponent,
    MatIconModule,
    ButtonsModule,
    PageNavigationComponent,
    SectionLinkComponent,
    PageLabelComponent,
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
