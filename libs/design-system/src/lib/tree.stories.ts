import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    <mat-tree [dataSource]="dataSource" [treeControl]="treeControl" class="example-tree">
      <!-- This is the tree node template for leaf nodes -->
      <!-- There is inline padding applied to this node using styles.
        This padding value depends on the mat-icon-button width. -->
      <mat-tree-node *matTreeNodeDef="let node">
        {{ node.name }}
      </mat-tree-node>
      <!-- This is the tree node template for expandable nodes -->
      <mat-nested-tree-node
        *matTreeNodeDef="let node; when: hasChild"
        matTreeNodeToggle
        [cdkTreeNodeTypeaheadLabel]="node.name"
      >
        <div class="mat-tree-node">
          <button mat-icon-button matTreeNodeToggle [attr.aria-label]="'Toggle ' + node.name">
            <mat-icon class="mat-icon-rtl-mirror">
              {{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
            </mat-icon>
          </button>
          {{ node.name }}
        </div>
        <!-- There is inline padding applied to this div using styles.
            This padding value depends on the mat-icon-button width.  -->
        <div [class.example-tree-invisible]="!treeControl.isExpanded(node)" role="group">
          <ng-container matTreeNodeOutlet></ng-container>
        </div>
      </mat-nested-tree-node>
    </mat-tree>
  `,
  styles: `
    .example-tree-invisible {
      display: none;
    }

    .example-tree ul,
    .example-tree li {
      margin-top: 0;
      margin-bottom: 0;
      list-style-type: none;
    }

    /*
    * This padding sets alignment of the nested nodes.
    */
    .example-tree .mat-nested-tree-node div[role='group'] {
      padding-left: 40px;
    }

    /*
    * Padding for leaf nodes.
    * Leaf nodes need to have padding so as to align with other non-leaf nodes
    * under the same parent.
    */
    .example-tree div[role='group'] > .mat-tree-node {
      padding-left: 40px;
    }
  `,
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TreeDemoComponent {
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}

import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { provideDesignSystem } from './providers';

const meta: Meta<TreeDemoComponent> = {
  component: TreeDemoComponent,
  title: 'Tree',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=786-4',
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

export const Primary: Story = {
  args: {},
};
