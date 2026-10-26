import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatTableModule } from '@angular/material/table';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { GradientPoint } from '../../../../atoms/src/lib/gradient-legend/gradient-legend.component';
import { SizeLegend } from '../../../../atoms/src/lib/size-legend/size-legend.component';
import { BiomarkerTableComponent, DataCell, DataRow, TissueInfo } from './biomarker-table.component';

describe('BiomarkerTableComponent', () => {
  const columns = ['RGMB', 'SOX9', 'CD44', 'LGR5'];
  const dataCell_data = {
    cell: 'cellName',
    biomarker: 'BioMarkerName',
    meanExpression: 0.1,
    dataset_count: 0,
  };
  const data: DataRow<DataCell>[] = [
    ['enteroendocrine cell', 17, undefined, undefined],
    ['absorptive cell', 2764, undefined, undefined],
    [
      'epithelial stem cell',
      187,
      {
        color: '#00385F',
        size: 0.625,
        data: dataCell_data,
      },
      {
        color: '#328BB8',
        size: 1.25,
        data: dataCell_data,
      },
    ],
    [
      'goblet cell',
      undefined,
      {
        color: '#00385F',
        size: 0.625,
        data: {
          cell: 'cellName',
          biomarker: 'BioMarkerName',
          meanExpression: 0.1,
          dataset_count: undefined,
        },
      },
      undefined,
    ],
  ];

  const sortedData: DataRow<DataCell>[] = [
    [
      'epithelial stem cell',
      187,
      {
        color: '#00385F',
        size: 0.625,
        data: dataCell_data,
      },
      {
        color: '#328BB8',
        size: 1.25,
        data: dataCell_data,
      },
    ],
    [
      'goblet cell',
      undefined,
      {
        color: '#00385F',
        size: 0.625,
        data: {
          cell: 'cellName',
          biomarker: 'BioMarkerName',
          meanExpression: 0.1,
          dataset_count: undefined,
        },
      },
      undefined,
    ],
    ['absorptive cell', 2764, undefined, undefined],
    ['enteroendocrine cell', 17, undefined, undefined],
  ];

  const gradient: GradientPoint[] = [
    {
      color: '#00000f',
      percentage: 0,
    },
    {
      color: '#00ffff',
      percentage: 50,
    },
    {
      color: '#ffffff',
      percentage: 100,
    },
  ];

  const sizes: SizeLegend[] = [
    { label: '0%', radius: 0.1 },
    { label: '50%', radius: 0.5 },
    { label: '100%', radius: 1.0 },
  ];

  const tissueInfo: TissueInfo = {
    label: '',
    id: '',
  };

  let shallow: Shallow<BiomarkerTableComponent<DataCell>>;

  beforeEach(() => {
    shallow = new Shallow(BiomarkerTableComponent<DataCell>)
      .dontMock(MatTableModule, TableVirtualScrollModule, PlainTooltipDirective)
      .provide(CdkVirtualScrollViewport)
      .mock(CdkVirtualScrollViewport, {
        checkViewportSize: () => undefined,
        scrollable: {
          elementScrolled: () => of(),
          measureViewportSize: () => 0,
          measureScrollOffset: () => 0,
        },
      });
  });

  it('should create BiomarkerTableComponent', async () => {
    await expect(
      shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } }),
    ).resolves.toBeDefined();
  });

  it('should update dataSource', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.dataSource.data).toStrictEqual(instance.sortTableData(instance.data));
  });

  it('should sort the table', async () => {
    const { instance } = await shallow.render({
      bind: {
        columns: columns,
        data: data,
        gradient,
        sizes,
        tissueInfo,
        illustrationIds: ['cellName'],
      },
    });
    instance.sortTableData(instance.data);
    expect(instance.dataSource.data).toStrictEqual(sortedData);
  });

  it('returns a size - getMinMaxSize function', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.getSize(0.9)).toBeDefined();
    expect(instance.getMinMaxSize(150)).toEqual({ minPercentage: 0.5, maxPercentage: 1, minValue: 0.5, maxValue: 1.0 });
  });

  it('returns a color - getMinMaxColor function', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.getColor(0.9)).toBeDefined();
    expect(instance.getMinMaxColor(150)).toEqual({
      minPercentage: 50,
      maxPercentage: 100,
      minValue: [0, 255, 255],
      maxValue: [255, 255, 255],
    });
  });

  it('interpolates sizes within each breakpoint segment', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.getSize(0)).toBeCloseTo(0.1);
    expect(instance.getSize(0.25)).toBeCloseTo(0.3);
    expect(instance.getSize(0.5)).toBeCloseTo(0.5);
    expect(instance.getSize(0.75)).toBeCloseTo(0.75);
    expect(instance.getSize(1)).toBeCloseTo(1.0);
  });

  it('normalizes values to [0, 1] and clamps values outside the range', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.normalizeMinMaxClamped(2, 2, 10)).toBe(0);
    expect(instance.normalizeMinMaxClamped(6, 2, 10)).toBe(0.5);
    expect(instance.normalizeMinMaxClamped(10, 2, 10)).toBe(1);
    expect(instance.normalizeMinMaxClamped(20, 2, 10)).toBe(1);
    expect(instance.normalizeMinMaxClamped(-5, 2, 10)).toBe(0);
    expect(instance.normalizeMinMaxClamped(5, 3, 3)).toBe(1);
  });

  it('scales colors using the min and max expression', async () => {
    const { instance } = await shallow.render({
      bind: { columns: columns, data: data, gradient, sizes, tissueInfo, minExpression: 2, maxExpression: 10 },
    });
    expect(instance.getColor(2)).toBe('#00000f');
    expect(instance.getColor(6)).toBe('#00ffff');
    expect(instance.getColor(10)).toBe('#ffffff');
    expect(instance.getColor(20)).toBe('#ffffff');
  });

  it('clamps values outside the gradient and sizes', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.getColor(-1)).toBe('#00000f');
    expect(instance.getColor(1.5)).toBe('#ffffff');
    expect(instance.getSize(-1)).toBeCloseTo(0.1);
    expect(instance.getSize(1.5)).toBeCloseTo(1.0);
  });

  it('uses the only entry when there is a single gradient point', async () => {
    const { instance } = await shallow.render({
      bind: { columns: columns, data: data, gradient: [{ color: '#123456', percentage: 0 }], sizes, tissueInfo },
    });
    expect(instance.getColor(0.5)).toBe('#123456');
  });

  it('throws when there are no gradient points', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    instance.gradient = [];
    expect(() => instance.getMinMaxColor(50)).toThrow();
  });

  it('interpolates colors within each gradient segment', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.getColor(0)).toBe('#00000f');
    expect(instance.getColor(0.5)).toBe('#00ffff');
    expect(instance.getColor(1)).toBe('#ffffff');
  });

  it('returns a result from getHoverData function', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.getHoverData([2, data[2]])).toBeDefined();
  });

  it('returns empty array from getHoverData if row not found', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.getHoverData([1, data[3]])).toEqual([]);
  });

  it('returns a result with tissueInfo empty as provided from getHoverData function', async () => {
    const { instance } = await shallow.render({
      bind: { columns: columns, data: data, gradient, sizes, tissueInfo: tissueInfo },
    });
    const res = instance.getHoverData([2, data[2]]);
    expect(res).toBeDefined();
  });

  it('returns a empty result from getHoverData function', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.getHoverData([2, data[2]])).toBeDefined();
  });

  it('sets the hoverId', async () => {
    const { instance, outputs } = await shallow.render({
      bind: { columns: columns, data: data, gradient, sizes, tissueInfo },
    });

    instance.setHoverId('test');
    expect(instance.highlightedCellId).toEqual('test');
    expect(outputs.rowHover.emit).toHaveBeenCalledWith('test');

    instance.setHoverId(undefined);
    expect(instance.highlightedCellId).toEqual('');
  });
});
