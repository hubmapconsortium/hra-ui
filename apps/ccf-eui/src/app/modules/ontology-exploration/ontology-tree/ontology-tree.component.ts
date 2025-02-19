import { FlatTreeControl } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { OntologyTreeNode } from '@hra-api/ng-client';
import { ToggleButtonSizeDirective } from '@hra-ui/design-system/button-toggle';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { TreeSizeDirective } from '@hra-ui/design-system/tree';
import { filter, invoke, property } from 'lodash';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { FlatNode } from '../../../core/models/flat-node';

export const labelMap = new Map([
  ['colon', 'large intestine'],
  ['body', 'Anatomical Structures'],
  ['cell', 'Cell Types'],
]);

/** Type of function for getting child nodes from a parent node. */
type GetChildrenFunc = (o: OntologyTreeNode) => OntologyTreeNode[];

/**
 * Getter function for 'level' on a flat node.
 */
const getLevel = property<FlatNode, number>('level');

/**
 * Getter function for 'expandable' on a flat node.
 */
const isExpandable = property<FlatNode, boolean>('expandable');

/**
 * Represents a expandable tree of an ontology.
 */
@Component({
  selector: 'ccf-ontology-tree',
  templateUrl: './ontology-tree.component.html',
  styleUrls: ['./ontology-tree.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTreeModule,
    MatButtonToggleModule,
    ToggleButtonSizeDirective,
    TreeSizeDirective,
    ScrollingModule,
    ScrollOverflowFadeDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OntologyTreeComponent implements OnInit, OnChanges {
  /**
   * Input of ontology filter, used for changing the ontology selections
   * from outside this component.
   */
  ontologyFilter = input<string[]>();

  /**
   * The root node IRI of the tree
   */
  rootNode = input.required<string>();

  /**
   * The node like objects to display in the tree.
   */
  @Input()
  set nodes(nodes: OntologyTreeNode[] | undefined) {
    this._nodes = nodes;
    if (this.treeControl) {
      this.dataSource.data = this._nodes ?? [];
    }
  }

  /**
   * List of nodes in the ontology tree
   */
  get nodes(): OntologyTreeNode[] | undefined {
    return this._nodes;
  }

  /**
   * Storage for getter/setter 'nodes'.
   */
  private _nodes?: OntologyTreeNode[] = undefined;

  /**
   * Method for fetching the children of a node.
   */
  @Input()
  set getChildren(fun: GetChildrenFunc | undefined) {
    this._getChildren = fun;
    this.dataSource.data = this.nodes ?? [];
  }

  get getChildren(): GetChildrenFunc | undefined {
    return this._getChildren;
  }

  /**
   * Storage for getter/setter 'getChildren'.
   */
  private _getChildren?: GetChildrenFunc;

  /**
   * Occurence Data is a record of terms that are in the current filter.
   */
  @Input()
  set occurenceData(value: Record<string, number>) {
    if (value) {
      this._occurenceData = value;
    } else {
      this._occurenceData = {};
    }
  }

  get occurenceData(): Record<string, number> {
    return this._occurenceData;
  }

  /**
   * Storage for the getter / setter
   */
  private _occurenceData!: Record<string, number>;

  /**
   * Term Data is a record of terms that the app currently has data for.
   */
  @Input()
  set termData(value: Record<string, number>) {
    if (value) {
      this._termData = value;
    } else {
      this._termData = {};
    }
  }

  get termData(): Record<string, number> {
    return this._termData;
  }

  /**
   * Storage for the getter / setter
   */
  private _termData!: Record<string, number>;

  menuOptions = input.required<string[]>();

  tooltips = input.required<string[]>();

  /**
   * Emits an event whenever a node has been selected.
   */
  readonly nodeSelected = output<OntologyTreeNode[]>();

  /**
   * Emits an event whenever the node's visibility changed
   */
  readonly nodeChanged = output<FlatNode>();

  /**
   * Any time a button is clicked, event is emitted.
   */
  readonly selectionChange = output<string[]>();

  readonly selectedBiomarkerOptions = output<string[]>();

  /**
   * Tree controller.
   */
  readonly treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  /**
   * Node flattener.
   */
  readonly flattener = new MatTreeFlattener(
    FlatNode.create,
    getLevel,
    isExpandable,
    invoke.bind(undefined, this, 'getChildren') as GetChildrenFunc,
  );

  /**
   * Data source of flat nodes.
   */
  readonly dataSource = new MatTreeFlatDataSource(this.treeControl, this.flattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  /**
   * Currently selected nodes, defaulted to the body node for when the page initially loads.
   */
  selectedNodes: FlatNode[] = [];

  topNode: FlatNode = { level: 0, expandable: true, label: 'body', original: { id: 'body', label: 'body' } };

  selectedToggleOptions: string[] = [];

  /**
   * Creates an instance of ontology tree component.
   *
   * @param cdr The change detector.
   * @param ga Analytics service
   */
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly ga: GoogleAnalyticsService,
  ) {}

  /**
   * Expand the body node when the component is initialized.
   */
  ngOnInit(): void {
    if (this.treeControl.dataNodes) {
      this.topNode = this.treeControl.dataNodes[0];
      this.treeControl.expand(this.topNode);
    }
    this.selectedToggleOptions = this.menuOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ontologyFilter']) {
      const ontologyFilter: string[] = changes['ontologyFilter'].currentValue as string[];
      if (ontologyFilter?.length >= 0) {
        this.selectByIDs(ontologyFilter);
      }
    }
    if (changes['rootNode']) {
      const rootNode = changes['rootNode'].currentValue;
      this.selectByIDs([rootNode]);
    }
    if (changes['nodes']) {
      this.selectByIDs([this.rootNode()]);
    }
  }

  selectByIDs(ids: string[]): void {
    const dataNodes = this.treeControl.dataNodes.filter((node) => node.label !== 'body');
    const selectedNodes: FlatNode[] = dataNodes.filter((node) => ids.indexOf(node.original.id ?? '') > -1);

    if (selectedNodes?.length > 0) {
      this.selectedNodes = selectedNodes;
      this.ga.event('nodes_selected_by_ids', 'ontology_tree', selectedNodes.map((node) => node.label).join(','));
      this.treeControl.collapseAll();
      this.selectedNodes.forEach((selectedNode) => {
        this.expandAndSelect(
          selectedNode.original,
          (node) => dataNodes.find((findNode) => findNode.original.id === node.parent)?.original as OntologyTreeNode,
          true,
        );
      });
    }
  }

  /**
   * Expands the tree to show a node and sets the currect selection to that node.
   *
   * @param node The node to expand to and select.
   */
  expandAndSelect(
    node: OntologyTreeNode,
    getParent: (n: OntologyTreeNode) => OntologyTreeNode,
    additive = false,
  ): void {
    const { cdr, treeControl } = this;

    // Add all parents to a set
    const parents = new Set<OntologyTreeNode>();
    let current = getParent(node);

    while (current) {
      parents.add(current);
      current = getParent(current);
    }

    // Find corresponding flat nodes
    const parentFlatNodes = filter(treeControl.dataNodes, (flat) => parents.has(flat.original));
    const flatNode = treeControl.dataNodes.find((flat) => flat.original === node);

    // Expand nodes
    if (!additive) {
      this.selectedNodes = [];
      treeControl.collapseAll();
    }

    for (const flat of parentFlatNodes) {
      treeControl.expand(flat);
    }
    if ((node.label === 'body' || node.id === 'biomarkers') && treeControl.dataNodes?.length > 0) {
      treeControl.expand(treeControl.dataNodes[0]);
    }

    // Select the node
    this.select(additive, flatNode, false, true);

    // Detect changes
    cdr.detectChanges();
  }

  /**
   * Determines whether a node can be expanded.
   *
   * @param node The node to test.
   * @returns True if the node has children.
   */
  isInnerNode(this: void, _index: number, node: FlatNode): boolean {
    return node.expandable;
  }

  /**
   * Gets a label for the count
   * @param node The flat node instance
   * @returns Label for the count
   */
  getCountLabel(node: FlatNode): string {
    return !node.original.parent ? 'Tissue Blocks: ' : '';
  }

  getCount(node: FlatNode): string {
    const id = node.original.id ?? '';
    return (this.occurenceData[id] || 0).toLocaleString('en-US');
  }

  /**
   * Gets Node label
   * @param label node label
   * @returns label for node
   */
  getNodeLabel(label: string): string {
    return labelMap.get(label) ?? label;
  }
  /**
   * Determines whether a node is currently selected.
   * Only a single node can be selected at any time.
   *
   * @param node  The node to test.
   * @returns True if the node is the currently selected node.
   */
  isSelected(node: FlatNode | undefined): boolean {
    return node?.original.id === this.rootNode()
      ? false
      : this.selectedNodes.filter((selectedNode) => node?.original.label === selectedNode?.original.label).length > 0;
  }

  /**
   * Handles selecting / deselecting nodes via updating the selectedNodes variable
   *
   * @param node The node to select.
   * @param ctrlKey Whether or not the selection was made with a ctrl + click event.
   */
  select(ctrlKey: boolean, node: FlatNode | undefined, emit: boolean, select: boolean): void {
    if (node === undefined) {
      this.selectedNodes = [];
      this.ga.event('nodes_unselected', 'ontology_tree');
      return;
    }

    // ctrl + click allows users to select multiple organs
    if (ctrlKey) {
      if (!select) {
        this.selectedNodes.splice(this.selectedNodes.indexOf(node), 1);
      } else if (this.selectedNodes.indexOf(node) < 0) {
        this.selectedNodes.push(node);
      }
    } else {
      this.selectedNodes = [];
      if (select) {
        this.selectedNodes.push(node);
      }
    }

    this.ga.event('nodes_selected', 'ontology_tree', this.selectedNodes.map((n) => n.label).join(','));

    if (emit) {
      this.nodeSelected.emit(this.selectedNodes.map((selectedNode) => selectedNode?.original));
    }
  }

  isItemSelected(item: string): boolean {
    return this.selectedToggleOptions ? this.selectedToggleOptions.includes(item) : false;
  }

  toggleSelection(value: string[]) {
    this.selectedToggleOptions = value;
    this.selectedBiomarkerOptions.emit([...this.selectedToggleOptions]);
  }
}
