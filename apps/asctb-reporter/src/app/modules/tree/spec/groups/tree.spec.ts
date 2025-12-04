import { TreeMarkGroup } from './tree';

describe('TreeMarkGroup', () => {
  let treeGroup: TreeMarkGroup;

  beforeEach(() => {
    treeGroup = new TreeMarkGroup();
  });

  it('should create', () => {
    expect(treeGroup).toBeTruthy();
  });

  it('should create static instance', () => {
    const group = TreeMarkGroup.create();
    expect(group).toBeDefined();
    expect(group.type).toBe('group');
    expect(group.name).toBe('asTree');
  });

  it('should have tree mark group structure', () => {
    const group = treeGroup.group;
    expect(group.type).toBe('group');
    expect(group.name).toBe('asTree');
    expect(group.marks).toHaveLength(8);
    expect(group.signals).toBeDefined();
    expect(group.signals).toHaveLength(1);
    if (group.signals) {
      expect(group.signals[0].name).toBe('bgoffset');
    }
  });

  it('should create path marks', () => {
    const pathMark = treeGroup.makeTreePathMarks();
    expect(pathMark.type).toBe('path');
    expect(pathMark.from).toEqual({ data: 'links' });
  });

  it('should create symbol marks', () => {
    const symbolMark = treeGroup.makeTreeSymbolMarks();
    expect(symbolMark.type).toBe('symbol');
    expect(symbolMark.from).toEqual({ data: 'tree' });
  });

  it('should create text marks', () => {
    const textMark = treeGroup.makeTreeTextMarks();
    expect(textMark.type).toBe('text');
    expect(textMark.name).toBe('astextmark');
    expect(textMark.from).toEqual({ data: 'tree' });
  });

  it('should create search rect marks', () => {
    const searchMark = treeGroup.makeBimodalTextSearchMarks();
    expect(searchMark.type).toBe('rect');
    expect(searchMark.name).toBe('rectmark');
    expect(searchMark.from).toEqual({ data: 'astextmark' });
  });

  it('should create text link marks', () => {
    const linkMark = treeGroup.makeTreeTextLinkMarks();
    expect(linkMark.type).toBe('text');
    expect(linkMark.name).toBe('aslinktextmark');
    expect(linkMark.from).toEqual({ data: 'tree' });
  });

  it('should create discrepency label marks', () => {
    const discrepencyMark = treeGroup.makeBimodalTextDiscrepencyLabelMarks();
    expect(discrepencyMark.type).toBe('rect');
    expect(discrepencyMark.name).toBe('rectmarkdiscrepencylabel');
    expect(discrepencyMark.from).toEqual({ data: 'astextmark' });
  });

  it('should create discrepency id marks', () => {
    const discrepencyIdMark = treeGroup.makeBimodalTextDiscrepencyIdMarks();
    expect(discrepencyIdMark.type).toBe('rect');
    expect(discrepencyIdMark.name).toBe('rectmarkdiscrepencyid');
    expect(discrepencyIdMark.from).toEqual({ data: 'astextmark' });
  });

  it('should create duplicate id marks', () => {
    const duplicateIdMark = treeGroup.makeBimodalTextDuplicateIdMarks();
    expect(duplicateIdMark.type).toBe('rect');
    expect(duplicateIdMark.name).toBe('rectmarkduplicateid');
    expect(duplicateIdMark.from).toEqual({ data: 'astextmark' });
  });
});
