import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TreeSize, TreeSizeDirective } from '../tree-size/tree-size.directive';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

@Component({
  selector: 'hra-tree-demo',
  templateUrl: 'tree-demo.html',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, TreeSizeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeDemoComponent {
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  activeNode?: FoodNode;

  readonly size = input<TreeSize>('medium');

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  selectNode(node: FoodNode) {
    this.activeNode = node;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}
