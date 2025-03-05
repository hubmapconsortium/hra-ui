import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OntologyTreeNode } from '@hra-api/ng-client';
import { ToggleButtonSizeDirective } from '@hra-ui/design-system/button-toggle';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { TreeSizeDirective } from '@hra-ui/design-system/tree';
import { produce } from 'immer';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

export const labelMap = new Map([
  ['colon', 'large intestine'],
  ['body', 'Anatomical Structures'],
  ['cell', 'Cell Types'],
]);

/** Type of function for getting child nodes from a parent node. */
type GetChildrenFunc = (o: OntologyTreeNode) => OntologyTreeNode[];

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
export class OntologyTreeComponent {
  /**
   * The root node IRI of the tree
   */
  readonly rootNode = input.required<OntologyTreeNode>();

  readonly getChildren = input.required<GetChildrenFunc>();

  /**
   * Occurence Data is a record of terms that are in the current filter.
   */
  readonly occurenceData = input.required<Record<string, number>>();

  /**
   * Term Data is a record of terms that the app currently has data for.
   */
  readonly termData = input.required<Record<string, number>>();

  readonly biomarkerMenuOptions = input.required<string[]>();

  /**
   * Emits an event whenever a node has been selected.
   */
  readonly nodeSelected = output<OntologyTreeNode[]>();

  /**
   * Emits an event whenever the node's visibility changed
   */
  readonly nodeChanged = output<OntologyTreeNode>();

  /**
   * Any time a button is clicked, event is emitted.
   */
  readonly selectionChange = output<string[]>();

  readonly biomarkerOptionsChange = output<string[]>();

  protected readonly nodes = computed(() => this.getChildren()(this.rootNode()));

  /**
   * Currently selected nodes, defaulted to the body node for when the page initially loads.
   */
  protected selection = signal<Set<OntologyTreeNode>>(new Set());

  /**
   * Analytics service
   */
  private readonly ga = inject(GoogleAnalyticsService);

  protected selectedBiomarkerOptions: string[] = [];

  constructor() {
    effect(() => {
      this.selectedBiomarkerOptions = this.biomarkerMenuOptions();
    });
  }

  hasChildren(_: number, node: OntologyTreeNode): boolean {
    return node.children !== undefined && node.children.length > 0;
  }

  getCount(node: OntologyTreeNode): string {
    const id = node.id ?? '';
    return (this.occurenceData()[id] ?? 0).toLocaleString();
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
  isSelected(node: OntologyTreeNode): boolean {
    return this.selection().has(node);
  }

  /**
   * Handles selecting / deselecting nodes via updating the selectedNodes variable
   *
   * @param node The node to select.
   * @param ctrlKey Whether or not the selection was made with a ctrl + click event.
   */
  select(ctrlKey: boolean, node: OntologyTreeNode, emit: boolean, select: boolean): void {
    this.selection.update(
      produce((selection) => {
        if (!ctrlKey) {
          selection.clear();
        }
        if (select) {
          selection.add(node);
        } else {
          selection.delete(node);
        }
      }),
    );

    const selection = [...this.selection().values()];
    if (selection.length === 0) {
      this.ga.event('nodes_unselected', 'ontology_tree');
    } else {
      const data = selection.map(({ label }) => label).join(',');
      this.ga.event('nodes_selected', 'ontology_tree', data);
    }

    if (emit) {
      this.nodeSelected.emit(selection);
    }
  }

  isOptionSelected(item: string): boolean {
    return this.selectedBiomarkerOptions ? this.selectedBiomarkerOptions.includes(item) : false;
  }

  toggleSelection(value: string[]) {
    this.selectedBiomarkerOptions = value;
    this.biomarkerOptionsChange.emit(value);
  }
}
