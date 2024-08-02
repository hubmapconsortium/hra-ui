import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { NavItems } from '../toolbar/nav-items';

/** Displays a menu overlay on smaller screens */
@Component({
  selector: 'menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss'],
})
export class MenuTreeComponent {
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
  hubmapData = [
    {
      menuName: 'About',
      card: [
        {
          icon: 'assets/images/hubmap-consortium.svg',
          title: 'HuBMAP Consortium',
          description:
            'HuBMAP all access: Learn about us, our policies, data, and tools. Explore our publications and how to work with us.',
        },
      ],
    },
    {
      menuName: 'Data',
      card: [
        {
          icon: 'assets/images/hubmap-portal.svg',
          title: 'HuBMAP Data Portal',
          description:
            'Explore, visualize and download consortium-generated spatial and single cell data for the human body.',
        },
        {
          icon: 'assets/images/hubmap-portal.svg',
          title: 'Data Portal Workspaces',
          description:
            'Access HuBMAP data in a lightweight exploration platform and perform analyses directly within the portal.',
        },
      ],
    },
    {
      menuName: 'Atlas',
      card: [
        {
          icon: 'assets/images/hra.svg',
          title: 'Human Reference Atlas',
          description:
            'Use the HRA Portal to access atlas data, explore atlas functionality, and contribute to the Human Reference Atlas.',
        },
        {
          icon: 'assets/images/hubmap-eui.svg',
          title: 'Exploration User Interface',
          description:
            'Explore and validate spatially registered single-cell datasets in three-dimensions across organs.',
        },
        {
          icon: 'assets/images/reporter.svg',
          title: 'ASCT+B Reporter',
          description:
            'Explore and compare ASCT+B tables and construct validated panels for multiplexed antibody-based imaging (OMAPs) tables.',
        },
      ],
    },
    {
      menuName: 'Analytics Tools',
      card: [
        {
          icon: 'assets/images/azimuth.svg',
          title: 'Azimuth',
          description:
            'Azimuth uses a reference dataset to process, analyze, and interpret single-cell RNA-seq or ATAC-seq experiments.',
        },
        {
          icon: 'assets/images/fusion.svg',
          title: 'FUSION',
          description: 'Functional Unit State Identification and Navigation with WSI.',
        },
        {
          icon: 'assets/images/antibody.svg',
          title: 'Antibody Validation Reports',
          description:
            'Provide antibody details for multiplex imaging assays and capture data requested by journals for manuscript submission.',
        },
      ],
    },
  ];

  /** Creates instance of Router, ViewportScroller and Overlay */
  constructor(
    private readonly router: Router,
    private readonly scroller: ViewportScroller,
    private readonly overlay: Overlay,
  ) {}

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
}
