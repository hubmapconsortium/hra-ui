import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageSection } from '@hra-ui/design-system/content-templates/page-section';

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
  /** Section of item */
  readonly section = input.required<PageSection>();
  /** If the item is selected */
  readonly selected = input.required<boolean>();
}
