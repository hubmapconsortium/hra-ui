import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
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

export interface DataNode {
  label: string;
  children?: string[];
}

interface InternalNode<T extends DataNode> {
  label: string;
  expandable: boolean;
  level: number;
  data: T;
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
export class TissueTreeListComponent<T extends DataNode> implements OnChanges {
  @Input() nodes: Record<string, T> = {};

  /**
   * Node selected, to view the data associated with it
   */
  @Input() selected?: T = undefined;

  // private _transformer = (node: TissueTreeGroup, level: number) => {
  //   return {
  //     expandable: !!node.tissues && node.tissues.length > 0,
  //     name: node.label,
  //     level: level
  //   };
  // };

  /**
   * tree controller, used to control the nodes in the tree
   */
  // control = new NestedTreeControl<TissueTreeGroup>((node) => node.tissues);
  readonly control = new FlatTreeControl<InternalNode<T>>(
    (node) => node.level,
    (node) => node.expandable
  );

  readonly flattener = new MatTreeFlattener<T, InternalNode<T>>(
    (node, level) => ({
      label: node.label,
      expandable: (node.children?.length ?? 0) > 0,
      level,
      data: node,
    }),
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children?.map((id) => this.nodes[id])
  );

  readonly dataSource = new MatTreeFlatDataSource(this.control, this.flattener);

  /**
   * Data source for mat-tree data structure, which defines the data in mat-tree
   */
  // dataSource = new MatTreeNestedDataSource<TissueTreeGroup>();

  /**
   * Take actions if any data changes
   * @param changes changes in data
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('tissueTree' in changes) {
      this.dataSource.data = Object.values(this.nodes);
    }
  }

  /**
   * check if the current node has children
   * @param _ default mat-tree structure
   * @param node current selected node
   * @returns boolean, which means if node has children
   */
  hasChild(_: number, node: InternalNode<T>): boolean {
    return node.expandable;
  }

  /**
   * It selects/de-selects the node, which is clicked.
   * If the node is already selected, it de-selects it
   * @param node Tissue Tree Item, which is clicked
   */
  selectNode(node: InternalNode<T>): void {
    this.selected = this.selected === node.data ? undefined : node.data;
  }
}
