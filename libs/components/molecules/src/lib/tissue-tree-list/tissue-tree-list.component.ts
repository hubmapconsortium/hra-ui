import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';

interface TissueTreeItem {
  label: string;
}

interface TissueTreeGroup<T> {
  label: string;
  items: T[];
}

interface TissueTreeComponent<T> {
  groups: TissueTreeGroup<T>[];
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
  @Input() treeList: TissueTreeComponent<TissueTreeItem>;

  constructor() {
    this.treeList = {
      groups: [
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
      ],
    };
  }
}
