import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

/**
 * Base interface of items in the spatial search list
 */
export interface SpatialSearchListItem {
  /** Whether the item is selected */
  selected: boolean;

  /** Description displayed for the item */
  description: string;
}

/**
 * Displays a list of spatial searches
 */
@Component({
  selector: 'ccf-spatial-search-list',
  templateUrl: './spatial-search-list.component.html',
  styleUrls: ['./spatial-search-list.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatListModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchListComponent<T extends SpatialSearchListItem> {
  /** HTML class */
  @HostBinding('class') readonly clsName = 'ccf-spatial-search-list';

  /** Label for the list */
  readonly label = input<string>('');

  /** Items to display */
  readonly items = input<T[]>([]);

  /** Emits the new items when a selection changes */
  readonly selectionChanged = output<T[]>();

  /** Emits the item that has been removed from the list */
  readonly itemRemoved = output<T>();

  allSelected = true;

  /**
   * Computes a unique id for an item
   *
   * @param _index Unused
   * @param item An item
   * @returns A unique id
   */
  itemId(_index: number, item: T): string {
    return item.description;
  }

  /**
   * Updates the selected state for an item
   *
   * @param index Index of item to update
   * @param selected What to set the selected state to
   */
  updateItemSelection(index: number, selected: boolean): void {
    const newItems = [...this.items()];
    newItems[index] = { ...newItems[index], selected };

    const selectedItems = newItems.filter((item) => item.selected);
    this.allSelected = selectedItems.length === newItems.length;
    this.selectionChanged.emit(selectedItems);
  }

  /**
   * Removes an item from the list
   *
   * @param index Index of the item to remove
   */
  removeItem(index: number): void {
    const newItems = [...this.items()];
    const [item] = newItems.splice(index, 1);
    this.itemRemoved.emit(item);
  }

  updateAllItemsSelection(checked: boolean): void {
    this.allSelected = checked;
    const newItems = this.items().map((item) => ({ ...item, selected: checked }));
    this.selectionChanged.emit(newItems);
  }
}
