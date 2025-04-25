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
import { PageSectionService } from './services/page-section.service';

/**
 * Section of page containing content and a section header
 */
@Component({
  selector: 'hra-page-section',
  imports: [CommonModule, MatDividerModule, PageLabelComponent],
  templateUrl: './page-section.component.html',
  styleUrl: './page-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionComponent {
  /** Text on header */
  readonly tagline = input.required<string>();

  readonly level = input(1, { transform: numberAttribute });

  // TODO icons
  // /** App icon */
  // readonly app = input('');

  // /** Organ icon */
  // readonly organ = input('');

  // /** Website category icon */
  // readonly category = input('');

  readonly anchor = input<string>();

  readonly elementRef = viewChild.required('section', { read: ElementRef });

  constructor() {
    const destroyRef = inject(DestroyRef);
    const pageSectionService = inject(PageSectionService, { optional: true });
    if (pageSectionService) {
      pageSectionService.addSection(this);
      destroyRef.onDestroy(() => pageSectionService.removeSection(this));
    }
  }
}
