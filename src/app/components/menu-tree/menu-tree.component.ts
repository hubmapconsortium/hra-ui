import { Component } from '@angular/core';
import { CdkTreeNode, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NavItems } from '../toolbar/nav-items';
import { NAVIGATION_ITEMS } from 'src/app/shared/navigation-items';

@Component({
  selector: 'menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent {
  isOpen = false;
  treeControl = new NestedTreeControl<NavItems>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavItems>();

  constructor() {
    this.dataSource.data = NAVIGATION_ITEMS;
  }

  hasChild = (_: number, node: NavItems) => !!node.children && node.children.length > 0;
  
  externalWindow(url: string): void {
    window.open(
      url,
      '_blank'
    );
  }
}
