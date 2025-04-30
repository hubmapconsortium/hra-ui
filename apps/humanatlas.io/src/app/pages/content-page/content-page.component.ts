import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContentTemplateOutletDirective } from '@hra-ui/cdk/content-template';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { ContentPageData } from './types/content-page.schema';

/**
 * Content Page Component
 */
@Component({
  selector: 'hra-content-page',
  imports: [CommonModule, ContentTemplateOutletDirective, PageSectionComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentPageComponent {
  /** input data for content page */
  readonly data = input.required<ContentPageData>();
}
