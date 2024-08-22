import { NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';

import { TreeSize, TreeSizeDirective } from './tree-size/tree-size.directive';

/** Tree node data */
export interface TreeNode {
  /** Name of node */
  name: string;
  /** List of child nodes */
  children?: TreeNode[];
}

/**
 * Angular Material Tree component with HRA styles
 */
@Component({
  selector: 'hra-tree',
  templateUrl: 'tree.component.html',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, TreeSizeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent implements AfterViewInit {
  /** Nested tree control */
  readonly treeControl = new NestedTreeControl<TreeNode>((node) => node.children);

  /** Tree node data */
  readonly treeData = input<TreeNode[]>([]);

  /** Size of tree to use */
  readonly size = input<TreeSize>('medium');

  /** Data source for nested tree */
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  /** Current active node */
  activeNode?: TreeNode;

  /** Checks if a node has children */
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  /** Sets datasource data after view init */
  ngAfterViewInit() {
    this.dataSource.data = this.treeData();
  }
}
