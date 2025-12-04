import { BimodalMarkGroup } from './bimodal';

describe('BimodalMarkGroup', () => {
  let bimodalGroup: BimodalMarkGroup;

  beforeEach(() => {
    bimodalGroup = new BimodalMarkGroup();
  });

  it('should create', () => {
    expect(bimodalGroup).toBeTruthy();
  });

  it('should create static instance', () => {
    const group = BimodalMarkGroup.create();
    expect(group).toBeDefined();
    expect(group.type).toBe('group');
  });

  it('should have bimodal mark group structure', () => {
    const group = bimodalGroup.group;
    expect(group.type).toBe('group');
    expect(group.name).toBe('bimodal-network');
    expect(group.marks).toHaveLength(8);
  });

  it('should create path marks', () => {
    const pathMark = bimodalGroup.makeBimodalPathMarks();
    expect(pathMark.type).toBe('path');
    expect(pathMark.name).toBe('bimodal-path');
  });

  it('should create symbol marks', () => {
    const symbolMark = bimodalGroup.makeBimodalSymbolMarks();
    expect(symbolMark.type).toBe('symbol');
    expect(symbolMark.name).toBe('bimodal-symbol');
  });

  it('should create text marks', () => {
    const textMark = bimodalGroup.makeBiomodalTextMarks();
    expect(textMark.type).toBe('text');
    expect(textMark.name).toBe('textmark');
  });

  it('should create search rect marks', () => {
    const searchMark = bimodalGroup.makeBimodalTextSearchMarks();
    expect(searchMark.type).toBe('rect');
    expect(searchMark.name).toBe('rectmark');
  });
});
