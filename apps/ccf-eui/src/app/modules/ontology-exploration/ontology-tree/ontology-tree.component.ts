import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { OntologyTreeNode } from '@hra-api/ng-client';
import { ButtonToggleSizeDirective } from '@hra-ui/design-system/buttons/button-toggle';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { TreeSizeDirective } from '@hra-ui/design-system/tree';
import { produce } from 'immer';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/** Map of node labels to converted label */
export const labelMap = new Map([
  ['body', 'Anatomical Structures'],
  ['cell', 'Cell Types'],
]);

/** Type of function for getting child nodes from a parent node */
type GetChildrenFunc = (o: OntologyTreeNode) => OntologyTreeNode[];

/**
 * Represents an expandable ontology tree
 */
@Component({
  selector: 'ccf-ontology-tree',
  templateUrl: './ontology-tree.component.html',
  styleUrls: ['./ontology-tree.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    MatButtonToggleModule,
    ButtonToggleSizeDirective,
    TreeSizeDirective,
    ScrollingModule,
    ScrollOverflowFadeDirective,
    PlainTooltipDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OntologyTreeComponent {
  /** The root node IRI of the tree */
  readonly rootNode = input.required<OntologyTreeNode>();

  /** Function for getting children from a parent node */
  readonly getChildren = input.required<GetChildrenFunc>();

  /** Occurence Data is a record of terms that are in the current filter. */
  readonly occurenceData = input.required<Record<string, number>>();

  /** Term Data is a record of terms that the app currently has data for. */
  readonly termData = input.required<Record<string, number>>();

  /** Options for the biomarker toggle component */
  readonly biomarkerMenuOptions = input.required<string[]>();

  /** Tooltip that appears on header hover */
  readonly tooltip = input<string>();

  /** Emits an event whenever a node has been selected. */
  readonly nodeSelected = output<OntologyTreeNode[]>();

  /** Emits an event whenever the node's visibility changed */
  readonly nodeChanged = output<OntologyTreeNode>();

  /** Any time a button is clicked, event is emitted. */
  readonly selectionChange = output<string[]>();

  /** Emits selected biomarker options */
  readonly biomarkerOptionsChange = output<string[]>();

  /** All nodes to display in tree */
  protected readonly nodes = computed(() => this.getChildren()(this.rootNode()));

  /** Currently selected nodes, defaulted to the body node for when the page initially loads. */
  protected selection = signal<Set<OntologyTreeNode>>(new Set());

  /** Analytics service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** Currently selected biomarker options */
  protected selectedBiomarkerOptions: string[] = [];

  /**
   * Creates an instance of ontology tree component
   * Updates selected biomarker options when biomarker menu options change
   */
  constructor() {
    effect(() => {
      this.selectedBiomarkerOptions = this.biomarkerMenuOptions();
    });
  }

  /**
   * Determines whether a node has children
   * @param node Ontology T=tree node
   * @returns true if children
   */
  hasChildren(_: number, node: OntologyTreeNode): boolean {
    return node.children !== undefined && node.children.length > 0;
  }

  /**
   * Gets count for a node from occurrence data
   * @param node Ontology tree node
   * @returns Count as string
   */
  getCount(node: OntologyTreeNode): string {
    const id = node.id ?? '';
    return (this.occurenceData()[id] ?? 0).toLocaleString();
  }

  /**
   * Converts node label to the appropriate label for the tree
   * @param label Label from node
   * @returns Label for tree
   */
  getNodeLabel(label: string): string {
    return labelMap.get(label) ?? label;
  }

  /**
   * Determines whether a node is currently selected
   * @param node  The node to test
   * @returns True if the node is currently selected
   */
  isSelected(node: OntologyTreeNode): boolean {
    return this.selection().has(node);
  }

  /**
   * Handles selecting / deselecting nodes via updating the selectedNodes variable
   * @param ctrlKey Whether or not the selection was made with a ctrl + click event
   * @param node The node to select
   * @param emit Whether or not to emit the nodeSelected event
   * @param select Whether or not to add the node to selection
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

  /**
   * Determines whether biomarker option is selected
   * @param item Biomarker option name
   * @returns True if option selected
   */
  isBiomarkerOptionSelected(item: string): boolean {
    return this.selectedBiomarkerOptions ? this.selectedBiomarkerOptions.includes(item) : false;
  }

  /**
   * When biomarker options change, update selected biomarker options and emit the new selected options
   * @param value Selected biomarker options
   */
  biomarkerOptionSelectionChange(value: string[]) {
    this.selectedBiomarkerOptions = value;
    this.biomarkerOptionsChange.emit(value);
  }
}
