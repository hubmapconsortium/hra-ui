import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ViewportScroller } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { HUBMAP_NAV_ITEMS } from '../../shared/hubmap-navigation-items';
import { NavItems } from '../toolbar/nav-items';

/** Displays a menu overlay on smaller screens */
@Component({
  selector: 'menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss'],
  standalone: false,
})
export class MenuTreeComponent {
  /** Router */
  private readonly router = inject(Router);
  /** Scrolling service */
  private readonly scroller = inject(ViewportScroller);
  /** Overlay service */
  private readonly overlay = inject(Overlay);

  /** Sets the menu items to the datasource */
  @Input() set treeItems(items: NavItems[]) {
    this.dataSource.data = items;
  }

  /** Icon name for the menu button */
  @Input() icon = '';

  /** Custom class name for the overlay */
  @Input() overlayClass = '';

  /** Default class name for the menu */
  @Input() treeClass = '';

  /** Position details of the overlay */
  @Input() positions: ConnectedPosition[] = [];

  /** Flag to check if menu is open */
  isOpen = false;

  /** Id of the element on page to be scrolled to */
  scrollToId?: string;

  /** Tree Controller */
  treeControl = new NestedTreeControl<NavItems>((node) => node.children);

  /** Data source for the menu tree */
  dataSource = new MatTreeNestedDataSource<NavItems>();

  /** Scroll strategy for the overlay */
  scrollStrategy = this.overlay.scrollStrategies.block();

  /** Hubmap nav Data */
  hubmapNavData = HUBMAP_NAV_ITEMS;

  /** Checks if current node has children */
  hasChild = (_: number, node: NavItems) => !!node.children && node.children.length > 0;

  /** Opens URL in an external window */
  externalWindow(url: string): void {
    window.open(url, '_blank');
  }

  /** Sets the scrollToId with the id of selected menu item */
  scrollTo(id: string): void {
    this.router.navigate([], { fragment: id });
    this.scrollToId = id;
  }

  /** Scrolls to the id of the selected element */
  scrollAfterDetach(): void {
    if (this.scrollToId) {
      this.scroller.scrollToAnchor(this.scrollToId);
      this.scrollToId = undefined;
    }
  }

  /** Returns true if hubmap-nav component is to be rendered */
  isHubmapNav(_: number, node: NavItems) {
    return node.componentName === 'hubmap-nav';
  }

  /** Collapses all inactive nodes */
  collapseNonActiveNodes(node: NavItems) {
    const isExpanded = this.treeControl.isExpanded(node);
    this.treeControl.collapseAll();
    if (isExpanded) {
      this.treeControl.expand(node);
    }
  }
}
