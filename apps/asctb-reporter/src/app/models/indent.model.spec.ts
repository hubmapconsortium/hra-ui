import { ILNode } from './indent.model';

describe('ILNode', () => {
  describe('constructor', () => {
    it('should create node with all properties initialized correctly', () => {
      const children = [new ILNode('Child', [], 'ID:001')];
      const node = new ILNode('Parent', children, 'ID:100', '#FF0000');

      expect(node).toMatchObject({
        name: 'Parent',
        children,
        ontologyId: 'ID:100',
        color: '#FF0000',
        comparator: '',
        type: '',
      });
    });

    it('should use default color when not provided', () => {
      const node = new ILNode('Node', [], 'ID:200');
      expect(node.color).toBe('#808080');
    });
  });

  describe('search', () => {
    let rootNode: ILNode;

    beforeEach(() => {
      const children = [new ILNode('Cell Type A', [], 'CL:0001'), new ILNode('Cell Type B', [], 'CL:0002')];
      rootNode = new ILNode('Root', children, 'ROOT:001');
    });

    it.each([
      ['Cell Type A', 'CL:0001', 'exact match'],
      ['CELL TYPE B', 'CL:0002', 'uppercase'],
      ['cElL tYpE a', 'CL:0001', 'mixed case'],
    ])('should find child with %s (%s)', (searchTerm, expectedId) => {
      const result = rootNode.search(searchTerm);
      expect(result).toMatchObject({ ontologyId: expectedId });
    });

    it('should return empty object when child is not found', () => {
      expect(rootNode.search('Non-existent')).toEqual({});
    });

    it('should return empty object for node with no children', () => {
      const node = new ILNode('Leaf', [], 'LEAF:001');
      expect(node.search('Anything')).toEqual({});
    });

    it('should return empty object for node with undefined children', () => {
      const node = new ILNode('Node', [], 'NODE:001');
      node.children = undefined;
      expect(node.search('Anything')).toEqual({});
    });
  });
});
