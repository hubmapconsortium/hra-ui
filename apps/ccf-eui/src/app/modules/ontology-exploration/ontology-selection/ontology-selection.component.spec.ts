import { OntologyTree, OntologyTreeNode } from '@hra-api/ng-client';
import { render, screen, waitFor } from '@testing-library/angular';
import { ReplaySubject } from 'rxjs';
import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service';
import { OntologySelectionComponent } from './ontology-selection.component';

describe('OntologySelectionComponent', () => {
  let rootNode$: ReplaySubject<OntologyTreeNode>;
  let serviceMock: Pick<OntologySearchService, 'rootNode$' | 'setTreeModel' | 'getChildren'>;

  const baseTreeModel: OntologyTree = {
    root: 'biomarkers',
    nodes: {
      biomarkers: { id: 'biomarkers', label: 'Biomarkers', children: ['gene', 'protein'] },
      gene: { id: 'gene', label: 'Gene', parent: 'biomarkers' },
      protein: { id: 'protein', label: 'Protein', parent: 'biomarkers' },
      alphaGene: { id: 'alphaGene', label: 'Alpha', parent: 'gene' },
      betaProtein: { id: 'betaProtein', label: 'beta', parent: 'protein' },
      ignored: { id: 'ignored', label: 'Ignored', parent: 'lipids' },
    },
  };

  beforeEach(() => {
    rootNode$ = new ReplaySubject<OntologyTreeNode>(1);
    serviceMock = {
      rootNode$: rootNode$.asObservable(),
      setTreeModel: jest.fn((model: OntologyTree) => {
        rootNode$.next(model.nodes[model.root]);
      }),
      getChildren: jest.fn((node: OntologyTreeNode) => {
        const children = node.children ?? [];
        return children.map((id) => baseTreeModel.nodes[id]);
      }),
    };
  });

  it('builds biomarker menu options and filters children when root is biomarkers', async () => {
    await render(OntologySelectionComponent, {
      inputs: {
        occurenceData: {},
        termData: {},
        treeModel: baseTreeModel,
        tooltip: '',
      },
      providers: [{ provide: OntologySearchService, useValue: serviceMock }],
    });

    await waitFor(() => {
      const toggles = screen.getAllByRole('button', { name: /genes|proteins/i });
      expect(toggles.map((btn) => btn.textContent?.trim())).toEqual(['Genes', 'Proteins']);
      const treeItems = screen.getAllByRole('treeitem');
      const labels = treeItems.map((item) => item.textContent?.trim() ?? '');
      expect(labels.some((text) => text.includes('Alpha'))).toBe(true);
      expect(labels.some((text) => text.includes('beta'))).toBe(true);
    });
  });
});
