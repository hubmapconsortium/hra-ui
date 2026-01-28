import {
  BMNode,
  bimodalBSizeOptions,
  bimodalBTypeOptions,
  bimodalCTSizeOptions,
  bimodalSortOptions,
} from './bimodal.model';
import { PROTEIN_PRESENCE } from './sheet.model';
import { NODE_TYPE } from './tree.model';

describe('BMNode', () => {
  describe('constructor', () => {
    it('should create a BMNode with required parameters and defaults', () => {
      const node = new BMNode('Test Node', 1, 10, 20, 12, 'Test notes', 'Heart');

      expect(node).toMatchObject({
        name: 'Test Node',
        group: 1,
        x: 10,
        y: 20,
        fontSize: 12,
        notes: 'Test notes',
        organName: 'Heart',
        ontologyId: '',
        color: '#E41A1C',
        nodeSize: 300,
        proteinPresence: PROTEIN_PRESENCE.UNKNOWN,
        targets: [],
        sources: [],
        id: 0,
        problem: false,
        pathColor: '#ccc',
        isNew: false,
        type: NODE_TYPE.BM,
        label: '',
      });
    });

    it('should create a BMNode with all optional parameters', () => {
      const node = new BMNode(
        'Custom Node',
        2,
        30,
        40,
        14,
        'Custom notes',
        'Liver',
        'UBERON:0001234',
        '#00FF00',
        500,
        PROTEIN_PRESENCE.POS,
      );

      expect(node).toMatchObject({
        name: 'Custom Node',
        ontologyId: 'UBERON:0001234',
        color: '#00FF00',
        nodeSize: 500,
        proteinPresence: PROTEIN_PRESENCE.POS,
      });
    });

    it('should set nodeSize to 50 when provided value is 0', () => {
      const node = new BMNode('Node', 1, 0, 0, 10, 'Notes', 'Organ', '', '#000', 0);
      expect(node.nodeSize).toBe(50);
    });

    it.each([
      [1, 'Anatomical Structures'],
      [2, 'Cell Types'],
      [3, 'Biomarkers'],
    ])('should set correct groupName for group %i (%s)', (group, expectedName) => {
      const node = new BMNode('Node', group, 0, 0, 10, 'Notes', 'Organ');
      expect(node.groupName).toBe(expectedName);
    });
  });

  describe('optional properties', () => {
    let node: BMNode;

    beforeEach(() => {
      node = new BMNode('Node', 1, 0, 0, 10, 'Notes', 'Organ');
    });

    it('should allow setting degree property', () => {
      node.degree = 5;
      expect(node.degree).toBe(5);
    });

    it('should allow setting indegree property', () => {
      const indegreeSet = new Set([{ id: 'test1', name: 'Test Node 1' }]);
      node.indegree = indegreeSet;
      expect(node.indegree).toBe(indegreeSet);
    });

    it('should allow setting outdegree property', () => {
      const outdegreeSet = new Set([{ id: 'test2', name: 'Test Node 2' }]);
      node.outdegree = outdegreeSet;
      expect(node.outdegree).toBe(outdegreeSet);
    });

    it('should allow setting bType property', () => {
      node.bType = 'Gene';
      expect(node.bType).toBe('Gene');
    });

    it('should allow setting references property', () => {
      const refs = [{ doi: '10.1234/test', notes: 'Test reference' }];
      node.references = refs;
      expect(node.references).toEqual(refs);
    });
  });
});

describe('bimodal constants', () => {
  it.each([
    ['bimodalSortOptions', bimodalSortOptions, ['Alphabetically', 'Degree']],
    ['bimodalBSizeOptions', bimodalBSizeOptions, ['None', 'Degree']],
    ['bimodalCTSizeOptions', bimodalCTSizeOptions, ['None', 'Degree', 'Indegree', 'Outdegree']],
    ['bimodalBTypeOptions', bimodalBTypeOptions, ['All', 'Gene', 'Protein', 'Lipids', 'Metabolites', 'Proteoforms']],
  ])('should export %s', (name, actual, expected) => {
    expect(actual).toEqual(expected);
  });
});
