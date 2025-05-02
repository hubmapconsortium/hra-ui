import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  numberAttribute,
  viewChildren,
} from '@angular/core';
import {
  PageSectionActivationService,
  PageSectionComponent,
  providePageSectionNavigation,
} from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsComponent } from '../table-of-contents.component';

/** Table of contents demo */
@Component({
  selector: 'hra-table-of-contents-demo',
  imports: [CommonModule, PageSectionComponent, TableOfContentsComponent],
  templateUrl: './table-of-contents-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [...providePageSectionNavigation()],
})
export class TableOfContentsDemoComponent {
  /** Active section index */
  readonly activeSection = input(undefined, { transform: numberAttribute });

  /** Section activation service */
  private readonly activationService = inject(PageSectionActivationService);
  /** All sections under this component */
  private readonly sections = viewChildren(PageSectionComponent);

  /** Initialize demo component */
  constructor() {
    effect(() => {
      const index = this.activeSection();
      const sections = this.sections();
      if (index !== undefined && index > 0 && index <= sections.length) {
        this.activationService.activate(sections[index - 1]);
      }
    });
  }
}
