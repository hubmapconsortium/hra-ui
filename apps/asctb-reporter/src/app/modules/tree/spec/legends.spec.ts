import { Legends } from './legends';

describe('Legends', () => {
  let legends: Legends;

  beforeEach(() => {
    legends = new Legends();
  });

  it('should create instance via static method and constructor', () => {
    const result = Legends.create();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
    expect(legends.legends).toHaveLength(0);
  });

  it('should create bimodal legend with correct configuration', () => {
    const result = legends.makeBimodalLegend();
    expect(result).toEqual({
      type: 'symbol',
      orient: 'top-left',
      fill: 'bimodal',
      title: 'Legend',
      offset: -15,
      titlePadding: 20,
      titleFontSize: 16,
      labelFontSize: 14,
      labelOffset: 10,
      symbolSize: 200,
      rowPadding: 10,
    });
  });

  it('should create tree legend with correct configuration and encoding', () => {
    const result = legends.makeTreeLegend();
    expect(result).toEqual({
      type: 'symbol',
      orient: 'none',
      legendX: -15,
      legendY: 98,
      fill: 'treeLegend',
      labelFontSize: 14,
      labelOffset: 10,
      symbolSize: 200,
      rowPadding: 10,
      encode: {
        symbols: {
          update: {
            stroke: { value: 'black' },
            strokeWidth: { value: 2 },
          },
        },
      },
    });
  });
});
