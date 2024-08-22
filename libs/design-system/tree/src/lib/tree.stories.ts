import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  standalone: true,
  template: `
    <mat-tree [dataSource]="dataSource" [treeControl]="treeControl" [hraTreeSize]="size()">
      <mat-tree-node *matTreeNodeDef="let node" [class.selected]="activeNode === node" (click)="selectNode(node)">
        {{ node.name }}
      </mat-tree-node>

      <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">
        <div class="mat-tree-node" matTreeNodeToggle>
          <button mat-icon-button [attr.aria-label]="'Toggle ' + node.name">
            <mat-icon>
              {{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
            </mat-icon>
          </button>
          {{ node.name }}
        </div>
        <div [class.tree-invisible]="!treeControl.isExpanded(node)" role="group">
          <ng-container matTreeNodeOutlet></ng-container>
        </div>
      </mat-nested-tree-node>
    </mat-tree>
  `,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, TreeSizeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TreeDemoComponent {
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

import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '@hra-ui/design-system';
import { TreeSize, TreeSizeDirective } from './tree-size/tree-size.directive';

const meta: Meta<TreeDemoComponent> = {
  component: TreeDemoComponent,
  title: 'Tree',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=786-4',
    },
  },
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<TreeDemoComponent>;

export const Primary: Story = {};
