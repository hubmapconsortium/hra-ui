import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Section } from '../table-of-contents.component';

@Component({
  selector: 'hra-table-of-contents-item',
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--indentation-level]': 'section().level',
  },
})
export class ItemComponent {
  /** Section of item */
  readonly section = input.required<Section>();
  /** If the item is selected */
  readonly selected = input.required<boolean>();
  /** Base url */
  readonly baseUrl = input.required<string>();
}
