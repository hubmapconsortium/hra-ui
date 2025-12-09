import { BimodalMarkGroup } from './groups/bimodal';
import { MultiParentMarkGroup } from './groups/multiparent';
import { TreeMarkGroup } from './groups/tree';
import { Marks } from './marks';

jest.mock('./groups/bimodal');
jest.mock('./groups/multiparent');
jest.mock('./groups/tree');

describe('Marks', () => {
  const mockBimodalGroup = { type: 'group', name: 'bimodal-network' };
  const mockMultiParentGroup = { type: 'group', name: 'multiParent' };
  const mockTreeGroup = { type: 'group', name: 'asTree' };

  beforeEach(() => {
    (BimodalMarkGroup.create as jest.Mock).mockReturnValue(mockBimodalGroup);
    (MultiParentMarkGroup.create as jest.Mock).mockReturnValue(mockMultiParentGroup);
    (TreeMarkGroup.create as jest.Mock).mockReturnValue(mockTreeGroup);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create instance via static method and constructor with all mark groups', () => {
    const result = Marks.create();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);

    const marks = new Marks();
    expect(marks.marks).toHaveLength(3);
    expect(marks.marks).toEqual([mockMultiParentGroup, mockTreeGroup, mockBimodalGroup]);
  });

  it('should create mark groups by calling respective static methods', () => {
    const marks = new Marks();

    expect(marks.makeTreeMarkGroup()).toBe(mockTreeGroup);
    expect(TreeMarkGroup.create).toHaveBeenCalled();

    expect(marks.makeMultiParentMarkGroup()).toBe(mockMultiParentGroup);
    expect(MultiParentMarkGroup.create).toHaveBeenCalled();

    expect(marks.makeBimodalMarkGroup()).toBe(mockBimodalGroup);
    expect(BimodalMarkGroup.create).toHaveBeenCalled();
  });
});
