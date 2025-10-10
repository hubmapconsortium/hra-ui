import { MultiParentMarkGroup } from './multiparent';

describe('MultiParentMarkGroup', () => {
  let multiParentGroup: MultiParentMarkGroup;

  beforeEach(() => {
    multiParentGroup = new MultiParentMarkGroup();
  });

  it('should create', () => {
    expect(multiParentGroup).toBeTruthy();
  });

  it('should create static instance', () => {
    const group = MultiParentMarkGroup.create();
    expect(group).toBeDefined();
    expect(group.type).toBe('group');
    expect(group.name).toBe('multiParent');
  });

  it('should have multiparent mark group structure', () => {
    const group = multiParentGroup.group;
    expect(group.type).toBe('group');
    expect(group.name).toBe('multiParent');
    expect(group.marks).toBeDefined();
    expect(Array.isArray(group.marks)).toBe(true);
  });

  it('should create path marks', () => {
    const pathMark = multiParentGroup.makeMultiParentPathMarks();
    expect(pathMark.type).toBe('path');
    expect(pathMark.from).toEqual({ data: 'multi_parent_edges' });
    expect(pathMark.encode.update.strokeDash).toEqual({ value: [5, 8] });
  });
});
