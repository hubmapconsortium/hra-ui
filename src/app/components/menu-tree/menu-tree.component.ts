import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NavItems } from '../toolbar/nav-items';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent implements OnInit {
  @Input() treeItems: NavItems[];
  @Input() icon: string;
  @Input() overlayClass: string;
  @Input() treeClass: string;
  @Input() positions: ConnectedPosition[];

  isOpen = false;
  scrollToId?: string;
  treeControl = new NestedTreeControl<NavItems>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavItems>();
  scrollStrategy = this.overlay.scrollStrategies.block();

  constructor(
    private router: Router,
    private scroller: ViewportScroller,
    private readonly overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.treeItems;
  }

  hasChild = (_: number, node: NavItems) => !!node.children && node.children.length > 0;

  externalWindow(url: string): void {
    window.open(
      url,
      '_blank'
    );
  }

  scrollTo(id: string): void {
    this.router.navigate([], { fragment: id });
    this.scrollToId = id;
  }

  scrollAfterDetach(): void {
    if (this.scrollToId) {
      this.scroller.scrollToAnchor(this.scrollToId);
      this.scrollToId = undefined;
    }
  }
}
