import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';

import { TableOfContentsComponent, Section } from '../table-of-contents/table-of-contents.component';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageLabelComponent } from '@hra-ui/design-system/content-templates/page-label';

/** Test section data */
export const TEST_SECTIONS: Section[] = [
  {
    label: 'Section label in sentence case 1',
    anchor: 'section-label-in-sentence-case-1',
    level: 1,
  },
  {
    label: 'Section label in sentence case 2',
    anchor: 'section-label-in-sentence-case-2',
    level: 2,
  },
  {
    label: 'Section label in sentence case 3',
    anchor: 'section-label-in-sentence-case-3',
    level: 3,
  },
  {
    label: 'Section label in sentence case 4',
    anchor: 'section-label-in-sentence-case-4',
    level: 4,
  },
  {
    label: 'Section label in sentence case 5',
    anchor: 'section-label-in-sentence-case-5',
    level: 5,
  },
  {
    label: 'Section label in sentence case 6',
    anchor: 'section-label-in-sentence-case-6',
    level: 1,
  },
  {
    label: 'Section label in sentence case 7',
    anchor: 'section-label-in-sentence-case-7',
    level: 2,
  },
  {
    label: 'Section label in sentence case 8',
    anchor: 'section-label-in-sentence-case-8',
    level: 2,
  },
];

/**
 * Demo for table of contents feature
 */
@Component({
  selector: 'hra-table-of-contents-demo',
  imports: [
    HraCommonModule,
    PageSectionComponent,
    MatIconModule,
    ButtonsModule,
    TableOfContentsComponent,
    SectionLinkComponent,
    PageLabelComponent,
  ],
  templateUrl: './table-of-contents-demo.component.html',
  styleUrl: './table-of-contents-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableOfContentsDemoComponent {
  /** Section data */
  readonly data: Section[] = TEST_SECTIONS;
}
