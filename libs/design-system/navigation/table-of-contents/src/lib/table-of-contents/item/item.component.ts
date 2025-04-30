import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageSection } from '@hra-ui/design-system/content-templates/page-section';

/** A single item in the table of content */
@Component({
  selector: 'hra-table-of-contents-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--indentation-level]': 'section().level()',
  },
})
export class ItemComponent {
  /** Associated section */
  readonly section = input.required<PageSection>();
  /** Whether the section is currently the active section */
  readonly selected = input.required<boolean>();
}
