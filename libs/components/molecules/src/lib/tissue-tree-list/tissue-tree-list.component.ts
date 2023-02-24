import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

interface TissueTreeGroup {
  label: string;
  items?: TissueTreeGroup[];
}

@Component({
  selector: 'hra-tissue-tree-list',
  standalone: true,
  imports: [CommonModule, MatTreeModule],
  templateUrl: './tissue-tree-list.component.html',
  styleUrls: ['./tissue-tree-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueTreeListComponent {
  @Input() treeList: TissueTreeGroup[];

  treeControl = new NestedTreeControl<TissueTreeGroup>((node) => node.items);

  dataSource = new MatTreeNestedDataSource<TissueTreeGroup>();

  constructor() {
    this.treeList = [
      {
        label: 'Kidney',
        items: [
          { label: 'Ascending thin limb' },
          { label: 'Cortical collecting duct' },
          { label: 'Collecting duct(inner medulla)' },
        ],
      },
      {
        label: 'Large Intestine',
        items: [{ label: 'Crypt of Lieberkuhn' }],
      },
      {
        label: 'Liver',
        items: [{ label: 'Liver lobule' }],
      },
    ];

    this.dataSource.data = this.treeList;
    console.log('dataSprce==', this.dataSource);
  }

  hasChild = (_: number, node: TissueTreeGroup) => !!node.items && node.items.length > 0;
}
