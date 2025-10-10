import { coerceArray } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ContentTemplateOutletDirective } from '@hra-ui/cdk/content-template';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MarkdownComponent } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';
import { NavigationModule } from '@hra-ui/design-system/navigation';

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
    MarkdownComponent,
    MatIconModule,
    PageSectionComponent,
    RouterModule,
    TableOfContentsLayoutModule,
    NavigationModule,
  ],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentPageComponent {
  /** Input data for content page */
  readonly data = input.required<ContentPageData>();

  /** Whether to show the footer */
  readonly showFooter = input<boolean>(true);

  /** Whether to show the table of contents */
  readonly showToc = input<boolean>(true);

  /** Header content data */
  protected readonly headerContent = computed(() => coerceArray(this.data().headerContent ?? []));

  /** Content data */
  protected readonly content = computed(() => coerceArray(this.data().content));
}
