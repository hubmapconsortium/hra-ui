import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatTableModule } from '@angular/material/table';
import { HoverDirective } from '@hra-ui/cdk';
import { GradientPoint, SizeLegend } from '@hra-ui/components/atoms';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

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
      .dontMock(MatTableModule)
      .dontMock(HoverDirective)
      .provide(CdkVirtualScrollViewport)
      .mock(CdkVirtualScrollViewport, {
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

  it('gets prefiller width', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    instance.updateHorizontalViewportOffset(176);
    expect(instance.preFillerWidth).toEqual('132px');
  });

  it('gets postfiller width', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    instance.updateHorizontalViewportOffset(176);
    expect(instance.postFillerWidth).toEqual('-44px');
  });

  it('returns a size - getMinMaxSize function', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.getSize(0.9)).toBeDefined();
    instance.getMinMaxSize(150);
  });

  it('returns a color - getMinMaxColor function', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    expect(instance.getColor(0.9)).toBeDefined();
    instance.getMinMaxColor(150);
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

  it('updates horizontal viewport size', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    const spy = jest.spyOn(instance, 'updateHorizontalViewportSize');
    instance.updateHorizontalViewportSize(200);
    instance.checkDisplayedColumns();
    expect(spy).toHaveBeenCalledWith(200);
  });

  it('updates horizontal viewport offset', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data, gradient, sizes, tissueInfo } });
    const spy = jest.spyOn(instance, 'updateHorizontalViewportOffset');
    instance.updateHorizontalViewportOffset(100);
    instance.checkDisplayedColumns();
    expect(spy).toHaveBeenCalledWith(100);
  });
});
