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
import { LinkDirective } from '@hra-ui/cdk';
import { LinkId } from '@hra-ui/cdk/state';

/** Base node type */
export interface DataNode<K extends string> {
  /** User readable label */
  label: string;
  /** Id to pass as a query parameter on navigation */
  id?: string;
  /** Link to navigate to on node click */
  link?: LinkId;
  /** Nested nodes */
  children?: K[];
}

/**
 * Internal interface for flat tissue data hierarchy
 */
interface InternalNode<K extends string, T extends DataNode<K>> {
  /** Displayed label */
  label: string;
  /** Whether the node can be expanded to display child nodes */
  expandable: boolean;
  /** Depth of node in the tree */
  level: number;
  /** Associated user node data */
  data: T;
}

/**
 * Tabular View for hubMap tissue side-bar
 */
@Component({
  selector: 'hra-tissue-tree-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTreeModule, MatIconModule, MatExpansionModule, LinkDirective],
  templateUrl: './tissue-tree-list.component.html',
  styleUrls: ['./tissue-tree-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueTreeListComponent<K extends string, T extends DataNode<K>> implements OnChanges {
  /**
   * Input  of tissue tree list component
   */
  @Input() nodes: Record<K, T> = {} as Record<K, T>;

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
  readonly control = new FlatTreeControl<InternalNode<K, T>>(
    (node) => node.level,
    (node) => node.expandable
  );

  /**
   * Flattener of tissue tree list component, returns flat-data structure
   */
  readonly flattener = new MatTreeFlattener<T, InternalNode<K, T>>(
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
  hasChild(_: number, node: InternalNode<K, T>): boolean {
    return node.expandable;
  }

  /**
   * It selects the node, which is clicked.
   * @param node Tissue Tree Item, which is clicked
   */
  selectNode(node: T): void {
    if (this.selected !== node) {
      this.selected = node;
      this.selectedChange.emit(this.selected);
    }
  }

  /**
   * It creates a copy of the input nodes object.
   * It iterates over it and removes all the children nodes from it.
   * @returns remaining nodes which are root nodes.
   */
  private findRootNodes(): T[] {
    const nodes = { ...this.nodes };
    for (const key in nodes) {
      for (const child of nodes[key].children ?? []) {
        delete nodes[child];
      }
    }

    return Object.values(nodes);
  }
}
