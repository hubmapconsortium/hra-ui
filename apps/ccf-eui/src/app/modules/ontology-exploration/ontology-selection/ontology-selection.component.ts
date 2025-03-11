import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { OntologyTree, OntologyTreeNode } from '@hra-api/ng-client';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service';
import { OntologyTreeComponent } from '../ontology-tree/ontology-tree.component';

/**
 * Ontology selection component that encapsulates ontology search and tree components.
 */
@Component({
  selector: 'ccf-ontology-selection',
  templateUrl: './ontology-selection.component.html',
  providers: [OntologySearchService],
  imports: [CommonModule, OntologyTreeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OntologySelectionComponent {
  /**
   * A record of terms within the current filter.  To be passed on to ontology-tree
   */
  readonly occurenceData = input.required<Record<string, number>>();

  /**
   * A record of terms the app currently has data for.  To be passed on to ontology-tree
   */
  readonly termData = input.required<Record<string, number>>();

  /**
   * The ontology tree model to display
   */
  readonly treeModel = input.required<OntologyTree | null>();

  readonly placeholderText = input.required<string>();

  readonly tooltip = input.required<string>();

  /**
   * Captures and passes along the change in ontologySelections.
   */
  readonly ontologySelection = output<OntologyTreeNode[]>();

  currentNodes!: string[];

  biomarkerMenuOptions!: string[];
  rootNode!: OntologyTreeNode;
  rootNode$: Observable<OntologyTreeNode>;
  biomarkerLabelMap = new Map([
    ['gene', 'Genes'],
    ['protein', 'Proteins'],
    ['metabolites', 'Metabolites'],
    ['proteoforms', 'Proteoforms'],
    ['lipids', 'Lipids'],
  ]);
  /**
   * Creates an instance of ontology selection component.
   *
   * @param ontologySearchService Service for searching the ontology.
   */
  constructor(public ontologySearchService: OntologySearchService) {
    this.rootNode$ = ontologySearchService.rootNode$.pipe(
      tap((rootNode) => {
        this.rootNode = { ...rootNode };
        if (this.rootNode.id === 'biomarkers') {
          this.biomarkerMenuOptions = [...(rootNode.children ?? [])]
            .map((option) => this.biomarkerLabelMap.get(option))
            .filter((x): x is string => x !== undefined);
          this.filterNodes(this.biomarkerMenuOptions);
        }
      }),
    );

    effect(() => {
      const model = this.treeModel();
      if (model) {
        this.ontologySearchService.setTreeModel(model);
      }
    });
  }

  filterNodes(selectedTypes: string[]): void {
    const nodes = Object.values(this.treeModel()?.nodes ?? {});
    const filteredNodes = nodes
      .filter((node) => selectedTypes.includes(this.biomarkerLabelMap.get(node.parent ?? '') ?? ''))
      .sort((node1, node2) =>
        (node1.label?.trim().toLowerCase() ?? '') > (node2.label?.trim().toLowerCase() ?? '') ? 1 : -1,
      );
    const rootNode = { ...this.rootNode };
    rootNode.children = filteredNodes.map((node) => node.id ?? '');
    this.rootNode = { ...rootNode };
  }
}
