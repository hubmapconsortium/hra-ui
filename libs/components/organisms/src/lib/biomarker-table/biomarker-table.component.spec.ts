import { BiomarkerTableComponent, DataCell, DataRow } from './biomarker-table.component';
import { Shallow } from 'shallow-render';
import { MatTableModule } from '@angular/material/table';
import { HoverDirective } from '@hra-ui/cdk';

describe('BiomarkerTableComponent', () => {
  const columns = ['RGMB', 'SOX9', 'CD44', 'LGR5'];
  const data: DataRow<DataCell>[] = [
    ['absorptive cell', 2764, undefined, undefined],
    ['enteroendocrine cell', 17, undefined, undefined],
    [
      'epithelial stem cell',
      187,
      {
        color: '#00385F',
        size: 0.625,
        data: [],
      },
      {
        color: '#328BB8',
        size: 1.25,
        data: [],
      },
    ],
    ['goblet cell', undefined, undefined, undefined],
  ];

  let shallow: Shallow<BiomarkerTableComponent<DataCell>>;

  beforeEach(() => {
    shallow = new Shallow(BiomarkerTableComponent<DataCell>).dontMock(MatTableModule).dontMock(HoverDirective);
  });

  it('should create BiomarkerTableComponent', async () => {
    await expect(shallow.render({ bind: { columns: columns, data: data } })).resolves.toBeDefined();
  });

  it('should update dataSource', async () => {
    const { instance } = await shallow.render({ bind: { columns: columns, data: data } });
    expect(instance.dataSource.data).toBe(data);
  });
});
