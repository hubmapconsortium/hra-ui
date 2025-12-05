import { AS_RED, B_GREEN, Cell, CT_BLUE, Marker, NODE_TYPE, ST_ID, TNode } from './tree.model';

describe('tree.model', () => {
  describe('constants', () => {
    it.each([
      ['AS_RED', AS_RED, '#E41A1C'],
      ['CT_BLUE', CT_BLUE, '#377EB8'],
      ['B_GREEN', B_GREEN, '#4DAF4A'],
      ['ST_ID', ST_ID, 2],
    ])('should export %s with value %s', (name, actual, expected) => {
      expect(actual).toBe(expected);
    });

    it('should export NODE_TYPE enum', () => {
      expect(NODE_TYPE).toEqual({ AS: 'AS', BM: 'BM', R: 'root' });
    });
  });

  describe('class constructors', () => {
    it('should initialize TNode with all properties', () => {
      const node = new TNode(1, 'Node', 0, 'ID:001', 'Notes', 'Heart', '#FF0000');

      expect(node).toMatchObject({
        id: 1,
        name: 'Node',
        parent: 0,
        ontologyId: 'ID:001',
        notes: 'Notes',
        organName: 'Heart',
        color: '#FF0000',
        problem: false,
        found: false,
        groupName: 'Multi-parent Nodes',
        isNew: false,
        pathColor: '#ccc',
        parents: [],
        children: 0,
        x: 0,
        y: 0,
        type: NODE_TYPE.AS,
        comparator: '',
        comparatorId: '',
        comparatorName: '',
        label: '',
      });
    });

    it.each([
      [
        'Cell',
        () => new Cell('Neuron', 'CL:001'),
        { structure: 'Neuron', link: 'CL:001', parents: [], isNew: false, color: '#ccc' },
      ],
      ['Marker', () => new Marker('CD4', 5), { structure: 'CD4', count: 5, parents: [], isNew: false, color: '#ccc' }],
    ])('should initialize %s with all properties', (name, createFn, expected) => {
      expect(createFn()).toMatchObject(expected);
    });

    it('should use default color in TNode', () => {
      expect(new TNode(1, 'N', 0, 'ID', 'Notes', 'Organ').color).toBe('#808080');
    });

    it('should use default link in Cell', () => {
      expect(new Cell('Cell').link).toBe('NONE');
    });
  });
});
