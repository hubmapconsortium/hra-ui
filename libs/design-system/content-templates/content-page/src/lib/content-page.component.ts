import { coerceArray } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ContentTemplateOutletDirective } from '@hra-ui/cdk/content-template';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';
import { MarkdownComponent } from '@hra-ui/design-system/content-templates/markdown';
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
  ],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentPageComponent {
  /** input data for content page */
  readonly data = input.required<ContentPageData>();

  /** header content data */
  protected readonly headerContent = computed(() => coerceArray(this.data().headerContent ?? []));

  /** content data */
  protected readonly content = computed(() => coerceArray(this.data().content));
}
