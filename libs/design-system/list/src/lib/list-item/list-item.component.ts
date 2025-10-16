import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListItemLine, MatListItemTitle, MatListOption } from '@angular/material/list';

type ListItemSelectionType = 'none' | 'single' | 'multiple' | 'switch';

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
  readonly title = input<string>('');
  readonly line2 = input<string>('');
  readonly line3 = input<string>('');
}
