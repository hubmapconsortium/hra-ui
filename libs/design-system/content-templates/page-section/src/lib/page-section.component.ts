import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  numberAttribute,
  viewChild,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { PageLabelComponent } from '@hra-ui/design-system/content-templates/page-label';
import { IconList } from '@hra-ui/design-system/icons';
import { PageSectionInstance, PageSectionService } from './services/page-section.service';

/**
 * A labeled section of the page
 */
@Component({
  selector: 'hra-page-section',
  imports: [CommonModule, MatDividerModule, PageLabelComponent],
  templateUrl: './page-section.component.html',
  styleUrl: './page-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionComponent implements PageSectionInstance {
  /** Title for the section */
  readonly tagline = input.required<string>();

  /** Level of <hx> element to use for the header */
  readonly level = input(1, { transform: numberAttribute });

  /** Icons to display as part of the label */
  readonly icons = input<IconList>();

  /** Anchor id for the section */
  readonly anchor = input<string>();

  /** Reference to the section element */
  readonly elementRef = viewChild.required('section', { read: ElementRef });

  /** Registers this section with the PageSectionService if available */
  constructor() {
    const destroyRef = inject(DestroyRef);
    const pageSectionService = inject(PageSectionService, { optional: true });
    if (pageSectionService) {
      pageSectionService.addSection(this);
      destroyRef.onDestroy(() => pageSectionService.removeSection(this));
    }
  }
}
