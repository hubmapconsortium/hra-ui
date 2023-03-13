import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

/**
 * Tissue Tree Item
 */
interface TissueTreeGroup {
  /**
   * name of the tissue
   */
  name: string;
  /**
   * child entities for the tissue
   */
  children?: TissueTreeGroup[];
}

/**
 * Tab View for hubMap tissue side-bar
 */
@Component({
  selector: 'hra-tissue-tree-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTreeModule, MatIconModule, MatExpansionModule],
  templateUrl: './tissue-tree-list.component.html',
  styleUrls: ['./tissue-tree-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueTreeListComponent implements OnChanges {
  /**
   * Tissue tree items heirarchial structure
   */
  @Input() treeList: TissueTreeGroup[] = [];

  /**
   * tree controller
   */
  treeControl = new NestedTreeControl<TissueTreeGroup>((node) => node.children);

  /**
   * Data source for mat-tree data structure
   */
  dataSource = new MatTreeNestedDataSource<TissueTreeGroup>();

  /**
   * currently selected item in heirarchy
   */
  selectedItem?: TissueTreeGroup = undefined;

  /**
   * Take actions if any data changes
   * @param changes changes in data
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('treeList' in changes) {
      this.dataSource.data = this.treeList;
      this.treeControl.dataNodes = this.treeList;
    }
  }

  /**
   * Returns if children exists for current node
   * @param _ default
   * @param node current node
   * @returns boolean
   */
  hasChild = (_: number, node: TissueTreeGroup) => !!node.children && node.children.length > 0;

  /**
   * selects the given tree item
   * @param item selected item
   */
  public selectItem(item: TissueTreeGroup): void {
    this.selectedItem = item;
  }

  /**
   * check if current item is selected by the user
   * @param item current item
   * @returns boolean
   */
  public isSelected(item: TissueTreeGroup): boolean {
    if (this.selectedItem && this.selectedItem == item) {
      return true;
    }
    return false;
  }

  /**
   * unselects the item
   */
  public unselectItem(): void {
    this.selectedItem = undefined;
  }
}
