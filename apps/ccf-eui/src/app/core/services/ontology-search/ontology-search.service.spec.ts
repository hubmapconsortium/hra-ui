import { OntologyTree, OntologyTreeNode } from '@hra-api/ng-client';
import { firstValueFrom } from 'rxjs';
import { OntologySearchService } from './ontology-search.service';

describe('OntologySearchService', () => {
  let service: OntologySearchService;

  const mockTree: OntologyTree = {
    root: 'root',
    nodes: {
      root: { id: 'root', label: 'Root Node', children: ['organ', 'synonym'] },
      organ: { id: 'organ', label: 'Heart', children: [], synonymLabels: ['Cardiac organ'] },
      synonym: { id: 'synonym', label: 'Kidney', children: [], synonymLabels: ['Renal cortex'] },
      noId: { id: undefined as unknown as string, label: 'Nameless', children: [] },
    },
  };

  beforeEach(() => {
    service = new OntologySearchService();
    service.setTreeModel(mockTree);
  });

  it('returns matches for label text with formatted labels and index', async () => {
    const results = await firstValueFrom(service.filter('hear'));

    expect(results).toHaveLength(1);
    expect(results[0].node.id).toBe('organ');
    expect(results[0].index).toBe(0);
    expect(results[0].displayLabel).toEqual(['', 'Hear', 't']);
  });

  it('returns matches for synonym text with composed label and index', async () => {
    const results = await firstValueFrom(service.filter('renal'));

    expect(results).toHaveLength(1);
    expect(results[0].node.id).toBe('synonym');
    expect(results[0].index).toBe('Kidney (Renal cortex)'.toLowerCase().indexOf('renal'));
    expect(results[0].displayLabel).toEqual(['Kidney (', 'Renal', ' cortex)']);
  });

  it('deduplicates matches per node id even if label and synonym both match', async () => {
    const overlappingTree: OntologyTree = {
      root: 'root',
      nodes: {
        root: { id: 'root', label: 'Root Node', children: ['both'] },
        both: { id: 'both', label: 'Liver', children: [], synonymLabels: ['Liver organ'] },
      },
    };
    service.setTreeModel(overlappingTree);

    const results = await firstValueFrom(service.filter('liver'));

    expect(results).toHaveLength(1);
    expect(results[0].node.id).toBe('both');
  });

  it('ignores nodes without an id', async () => {
    const results = await firstValueFrom(service.filter('nameless'));

    expect(results).toHaveLength(0);
  });

  it('getChildren returns the child nodes for a parent', () => {
    const rootChildren = service.getChildren(mockTree.nodes['root'] as OntologyTreeNode);

    expect(rootChildren.map((node) => node?.id)).toEqual(['organ', 'synonym']);
  });

  it('formatLabel slices label into prefix, match, and suffix', () => {
    expect(service.formatLabel('Frontal Lobe', 'front')).toEqual(['', 'Front', 'al Lobe']);
  });

  it('getIndexOfMatch returns the lower-cased index', () => {
    expect(service.getIndexOfMatch('Temporal Cortex', 'cortex')).toBe(9);
  });
});
