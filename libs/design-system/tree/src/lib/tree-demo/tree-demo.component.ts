import { ArrayDataSource } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTree, MatTreeModule } from '@angular/material/tree';

import { TreeSize, TreeSizeDirective } from '../tree-size/tree-size.directive';

/** Nested tree node data */
export interface NestedNode {
  /** Name of node */
  name: string;
  /** List of child nodes */
  children?: NestedNode[];
}

/** Padding indents for each tree size (px) */
const PADDING: Record<TreeSize, number> = {
  small: 32,
  medium: 36,
  large: 40,
};

/**
 * Angular Material nested tree component with HRA styles
 */
@Component({
  selector: 'hra-tree-demo',
  templateUrl: 'tree-demo.component.html',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, TreeSizeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeDemoComponent implements AfterViewInit {
  /** ViewChild for tree component */
  @ViewChild(MatTree) tree!: MatTree<NestedNode>;

  /** Tree node data */
  readonly treeData = input<NestedNode[]>([]);

  /** Size of tree to use */
  readonly size = input<TreeSize>('medium');

  /** Padding indents */
  protected readonly padding = computed(() => PADDING[this.size()]);

  /** Data source */
  dataSource = new ArrayDataSource<NestedNode>([]);

  /** Current selected node */
  selectedNode?: NestedNode;

  /** Gets the children of a node */
  childrenAccessor = (dataNode: NestedNode) => dataNode.children ?? [];

  /** If the node has a child */
  hasChild = (_: number, node: NestedNode) => !!node.children?.length;

  /** Sets dataSource data after view init */
  ngAfterViewInit() {
    this.dataSource = new ArrayDataSource<NestedNode>(this.treeData());
    console.warn(this.dataSource);
  }

  /** Renders node if it is a root node or if all of its ancestors are expanded */
  shouldRender(node: NestedNode): boolean {
    const parent = this.getParentNode(node);
    return !parent || (!!this.tree?.isExpanded(parent) && this.shouldRender(parent));
  }

  /** Gets parent of a node */
  private getParentNode(node: NestedNode): NestedNode | undefined {
    for (const parent of this.treeData()) {
      if (parent.children?.includes(node)) {
        return parent;
      }
    }
    return undefined;
  }
}
