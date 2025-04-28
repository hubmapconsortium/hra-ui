import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageSectionActivationService, PageSectionService } from '@hra-ui/design-system/content-templates/page-section';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { ItemComponent } from './item/item.component';

/**
 * Table of contents component for navigating between different sections on a page
 */
@Component({
  selector: 'hra-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.scss',
  imports: [HraCommonModule, MatTreeModule, ButtonsModule, MatIconModule, ScrollingModule, ItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentsComponent {
  /** Text for the header portion */
  readonly tagline = input('On this page');

  protected readonly sections = inject(PageSectionService).sortedSections;
  protected readonly activeSection = inject(PageSectionActivationService).activeSection;
}
