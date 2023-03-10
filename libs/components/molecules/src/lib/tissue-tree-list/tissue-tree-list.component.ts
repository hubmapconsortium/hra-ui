import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

interface TissueTreeGroup {
  name: string;
  children?: TissueTreeGroup[];
}

@Component({
  selector: 'hra-tissue-tree-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTreeModule, MatIconModule, MatExpansionModule],
  templateUrl: './tissue-tree-list.component.html',
  styleUrls: ['./tissue-tree-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueTreeListComponent {
  @Input() treeList: TissueTreeGroup[] = [];

  treeControl = new NestedTreeControl<TissueTreeGroup>((node) => node.children);

  dataSource = new MatTreeNestedDataSource<TissueTreeGroup>();

  constructor() {
    this.treeList = [
      {
        name: 'Kidney',
        children: [
          { name: 'Ascending thin limb' },
          { name: 'Cortical collecting duct' },
          { name: 'Collecting duct(inner medulla)' },
        ],
      },
      {
        name: 'Large Intestine',
        children: [{ name: 'Crypt of Lieberkuhn' }],
      },
      {
        name: 'Liver',
        children: [{ name: 'Liver lobule' }],
      },
    ];

    this.dataSource.data = this.treeList;
    this.treeControl.dataNodes = this.treeList;
  }

  hasChild = (_: number, node: TissueTreeGroup) => !!node.children && node.children.length > 0;
}
