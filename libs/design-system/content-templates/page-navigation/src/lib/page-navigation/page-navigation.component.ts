import { ArrayDataSource } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectionStrategy, Component, input, OnInit, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTree, MatTreeModule } from '@angular/material/tree';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/** Nested section item */
export interface Section {
  /** Name of section */
  label: string;
  /** Anchor for href */
  anchor: string;
  /** List of child sections */
  subSections?: Section[];
}

/**
 * Page navigation component for navigating between different sections on a page
 */
@Component({
  selector: 'hra-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.scss',
  imports: [HraCommonModule, MatTreeModule, ButtonsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavigationComponent implements OnInit, AfterViewInit {
  /** Text for the header portion */
  readonly tagline = input<string>('On this page');

  /** ViewChild for tree component */
  readonly tree = viewChild.required('tree', { read: MatTree });

  /** Tree node data */
  readonly treeData = input<Section[]>([]);

  /** Data source */
  dataSource = new ArrayDataSource<Section>([]);

  /** Current selected node */
  selectedNode?: Section;

  /** Gets the children of a node */
  childrenAccessor = (dataNode: Section) => dataNode.subSections ?? [];

  /** If the node has a child */
  hasChild = (_: number, node: Section) => !!node.subSections?.length;

  /** Sets dataSource data after view init */
  ngOnInit() {
    this.dataSource = new ArrayDataSource<Section>(this.treeData());
  }

  /** expands the tree after view init */
  ngAfterViewInit() {
    this.tree().expandAll();
  }
}
