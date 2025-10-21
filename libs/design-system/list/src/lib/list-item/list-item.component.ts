import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListItemLine, MatListItemTitle, MatListOption } from '@angular/material/list';

/**
 * List Item Component
 */
@Component({
  selector: 'hra-list-item',
  imports: [CommonModule, MatIconModule, MatListOption, MatListItemTitle, MatListItemLine],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent extends MatListItem {
  /** Title of the list item */
  readonly title = input.required<string>();

  /** Second line of the list item */
  readonly line2 = input<string>('');

  /** Third line of the list item */
  readonly line3 = input<string>('');
}
