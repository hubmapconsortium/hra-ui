import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class TissueTreeListComponent implements OnChanges {
  @Input() treeList: TissueTreeGroup[] = [];

  treeControl = new NestedTreeControl<TissueTreeGroup>((node) => node.children);

  dataSource = new MatTreeNestedDataSource<TissueTreeGroup>();

  ngOnChanges(changes: SimpleChanges): void {
    if ('treeList' in changes) {
      this.dataSource.data = this.treeList;
      this.treeControl.dataNodes = this.treeList;
    }
  }

  hasChild = (_: number, node: TissueTreeGroup) => !!node.children && node.children.length > 0;
}
