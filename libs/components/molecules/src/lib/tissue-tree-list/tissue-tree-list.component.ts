import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

/**
 * Tedefinesthe stucture for tissue heirarchy
 */
interface TissueTreeGroup {
  /**
   * label identifier
   */
  label: string;
  /**
   * child entities for the tissue
   */
  tissues?: TissueTreeGroup[];
}

/**
 * Tabular View for hubMap tissue side-bar
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
  @Input() tissueTree: TissueTreeGroup[] = [];

  /**
   * tree controller, used to control the nodes in the tree
   */
  control = new NestedTreeControl<TissueTreeGroup>((node) => node.tissues);

  /**
   * Data source for mat-tree data structure, which defines the data in mat-tree
   */
  dataSource = new MatTreeNestedDataSource<TissueTreeGroup>();

  /**
   * item which is currently selected by user
   */
  selectedItem?: TissueTreeGroup = undefined;

  /**
   * Take actions if any data changes
   * @param changes changes in data
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('tissueTree' in changes) {
      this.dataSource.data = this.tissueTree;
    }
  }

  /**
   * check if the current node has children
   * @param _ default mat-tree structure
   * @param node current selected node
   * @returns boolean, which means if node has children
   */
  hasChild(_: number, node: TissueTreeGroup): boolean {
    return !!node.tissues && node.tissues.length > 0;
  }
}
