import { FlatTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';

/**
 * External interface for tissue data
 */
export interface DataNode {
  /**
   * label identifier
   */
  label: string;
  /**
   * child entities for the tissue
   */
  children?: string[];
}

/**
 *  Internal interface for flat tissue data hierarchy
 */
interface InternalNode<T extends DataNode> {
  label: string;
  /**
   * property to check if the node has child entities
   */
  expandable: boolean;
  /**
   * index indentifier
   */
  level: number;
  /**
   * node data
   */
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
  /**
   * Input  of tissue tree list component
   */
  @Input() nodes: Record<string, T> = {};

  /**
   * Node selected, to view the data associated with it
   */
  @Input() selected?: T = undefined;

  /**
   * Output  of tissue tree list component
   */
  @Output() readonly selectedChange = new EventEmitter<T | undefined>();

  /**
   * tree controller, used to control the nodes in the tree
   */
  readonly control = new FlatTreeControl<InternalNode<T>>(
    (node) => node.level,
    (node) => node.expandable
  );

  /**
   * Flattener  of tissue tree list component, returns flat-data structure
   */
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

  /**
   * Data source of tissue tree list component, defines the data in mat-tree
   */
  readonly dataSource = new MatTreeFlatDataSource(this.control, this.flattener);

  /**
   * Take actions if any data changes
   * @param changes changes in data
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('nodes' in changes) {
      this.dataSource.data = this.findRootNodes();
    }
  }

  /**
   * check if the current node has children
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
    this.selectedChange.emit(this.selected);
  }

  private findRootNodes(): T[] {
    const nodes = { ...this.nodes };
    for (const key in nodes) {
      for (const child of nodes[key].children ?? []) {
        delete nodes[child];
      }
    }

    return Object.values(nodes);
  }

  changeStyle(): void {
    const div = document.getElementById('tree-class') as HTMLDivElement; // type assertion to HTMLDivElement
    div.style.backgroundColor = 'blue';
  }
}
