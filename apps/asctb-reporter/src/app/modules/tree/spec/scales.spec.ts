import { Scales } from './scales';

describe('Scales', () => {
  let scales: Scales;

  beforeEach(() => {
    scales = new Scales();
  });

  it('should create instance via static method and constructor with both scales', () => {
    const result = Scales.create();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(scales.scales).toHaveLength(2);
  });

  it('should create bimodal scale with three colors', () => {
    const result = scales.makeBiomodalScale();
    expect(result).toEqual({
      name: 'bimodal',
      type: 'ordinal',
      domain: { data: 'nodes', field: 'groupName' },
      range: ['#E41A1C', '#377EB8', '#4DAF4A'],
    });
  });

  it('should create tree legend scale with single color', () => {
    const result = scales.makeTreeLegendScale();
    expect(result).toEqual({
      name: 'treeLegend',
      type: 'ordinal',
      domain: { data: 'tree', field: 'groupName' },
      range: ['#E41A1C'],
    });
  });
});
