import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionActivationService, PageSectionService } from '@hra-ui/design-system/content-templates/page-section';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

/**
 * Table of contents component for navigating between different sections on a page
 */
@Component({
  selector: 'hra-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.scss',
  imports: [HraCommonModule, MatRippleModule, RouterModule, ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentsComponent {
  /** Title for the table of content */
  readonly tagline = input('On this page');

  /** All page sections sorted by dom order */
  protected readonly sections = inject(PageSectionService).sortedSections;
  /** Currently active section */
  protected readonly activeSection = inject(PageSectionActivationService).activeSection;
}
