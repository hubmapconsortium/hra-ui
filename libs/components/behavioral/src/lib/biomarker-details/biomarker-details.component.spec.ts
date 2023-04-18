import { MatTableModule } from '@angular/material/table';
import { HoverDirective } from '@hra-ui/cdk';
import { selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { DataItem } from '@hra-ui/components/molecules';
import { DataCell, DataRow } from '@hra-ui/components/organisms';
import { ResourceIds } from '@hra-ui/state';
import { Any } from '@hra-ui/utils/types';
import { Shallow } from 'shallow-render';
import { BiomarkerDetailsComponent, BiomarkerTab } from './biomarker-details.component';

jest.mock('@hra-ui/cdk/injectors');

export function createDataItem(label: string, value: string): DataItem {
  return { label, value };
}

describe('BiomarkerDetailsComponent', () => {
  const data = [
    [
      createDataItem('Functional Tissue Unit Name', 'Liver lobule'),
      createDataItem('New Uberon ID', 'UBERON1:0022285'),
      createDataItem('#Datasets1', '4'),
    ],
    [createDataItem('Cell Type Name', 'absorptive cell'), createDataItem('CL ID', 'CL:1119017')],
    [createDataItem('New Gene Name', 'RGMB'), createDataItem('Mean Expression Value', '0.0643')],
  ];

  const tableColumns: string[] = [
    'RGMB',
    'SOX9',
    'CD44',
    'LGR5',
    'chromosome inavalitentte A',
    'RGMB 2',
    'SOX9 2',
    'CD44 2',
    'LGR5 2',
    'chromosome inavalitentte A 2',
    'RGMB 3',
    'SOX9 3',
    'CD44 3',
    'LGR5 3',
    'chromosome inavalitentte A 3',
  ];

  const tableRows: DataRow<DataCell>[] = [
    [
      'absorptive cell',
      2764,
      {
        color: '#9ca5ee',
        size: 0.56,
        data: [],
      },
      undefined,
      {
        color: '#c6e2ff',
        size: 0.9,
        data: [],
      },
      undefined,
      {
        color: '#6f1414',
        size: 0.43,
        data: [],
      },
    ],
    [
      'enteroendocrine cell',
      17,
      undefined,
      {
        color: '#00ffb2',
        size: 0.689,
        data: [],
      },
      undefined,
    ],
    [
      'epithelial stem cell',
      187,
      {
        color: '#cb7b97',
        size: 0.625,
        data: [],
      },
      {
        color: '#f5f0e0',
        size: 1.25,
        data: [],
      },
      undefined,
      undefined,
      {
        color: '#efe1ce',
        size: 2.0,
        data: [],
      },
    ],
    [
      'goblet cell',
      undefined,
      {
        color: '#926aa6',
        size: 1.25,
        data: [],
      },
      undefined,
      {
        color: '#9ca5ee',
        size: 0.9,
        data: [],
      },
      {
        color: '#b2d5ba',
        size: 0.9,
        data: [],
      },
    ],
  ];

  const tabs: BiomarkerTab[] = [
    {
      label: 'Gene Biomarkers',
      tableRows: tableRows,
      tableColumns: tableColumns,
    },
    {
      label: 'Protein Biomarkers',
      tableRows: tableRows,
      tableColumns: tableColumns,
    },
    {
      label: 'Lipid Biomarkers',
      tableRows: [],
      tableColumns: [],
    },
  ];

  const gradientFn = jest.fn();
  const sizesFn = jest.fn();
  const sourceFn = jest.fn();
  let shallow: Shallow<BiomarkerDetailsComponent>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(selectQuerySnapshot).mockImplementation(((...args: Any[]) => {
      switch (args[1]) {
        case ResourceIds.GradientLegend:
          return gradientFn;
        case ResourceIds.SizeLegend:
          return sizesFn;
        default:
          return () => undefined;
      }
    }) as never);
    jest.mocked(selectSnapshot).mockImplementation(() => sourceFn);

    shallow = new Shallow(BiomarkerDetailsComponent).dontMock(MatTableModule, HoverDirective);
  });

  it('should create', async () => {
    await expect(shallow.render({ bind: { data: data, tabs: tabs } })).resolves.toBeDefined();
  });

  it('should update activeTab', async () => {
    gradientFn.mockReturnValueOnce([{ color: '#ffffff', percentage: 0.3 }]);
    sizesFn.mockReturnValueOnce([{ label: '', radius: 11 }]);

    const { instance } = await shallow.render({ bind: { data: data, tabs: tabs } });
    expect(instance.activeTab).toBe(tabs[0].label);
  });
});
