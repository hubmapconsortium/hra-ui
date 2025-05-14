import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ContentTemplateOutletDirective } from '@hra-ui/cdk/content-template';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';

import { ContentPageData } from './types/content-page.schema';

/**
 * Content Page Component
 */
@Component({
  selector: 'hra-content-page',
  imports: [
    HraCommonModule,
    ButtonsModule,
    ContentTemplateOutletDirective,
    MatIconModule,
    PageSectionComponent,
    RouterModule,
    TableOfContentsLayoutModule,
  ],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentPageComponent {
  /** input data for content page */
  readonly data = input.required<ContentPageData>();
}
