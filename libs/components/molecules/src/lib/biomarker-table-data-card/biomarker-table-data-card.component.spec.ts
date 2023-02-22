import { MatTableModule } from '@angular/material/table';
import { Shallow } from 'shallow-render';
import { BiomarkerTableDataCardComponent } from './biomarker-table-data-card.component';

const data = [
  [
    {
      label: 'Functional Tissue Unit Name',
      value: 'Crypt of Lieberkuhn',
    },
    {
      label: 'Uberon ID',
      value: 'UBERON:0011184',
    },
    {
      label: '#Datasets',
      value: '3',
    },
  ],
  [
    {
      label: 'Cell Type Name',
      value: 'epithelial stem cell',
    },
    {
      label: 'CL ID',
      value: 'CL:0009016',
    },
    {
      label: 'Number of Cells',
      value: '187',
    },
  ],
  [
    {
      label: 'Gene Name',
      value: 'RGMB',
    },
    {
      label: 'HGNC ID',
      value: 'HGNC:26896',
    },
    {
      label: 'Mean Expression Value',
      value: '0.0642',
    },
  ],
];
describe('BiomarkerTableDataCardComponent', () => {
  let shallow: Shallow<BiomarkerTableDataCardComponent>;
  beforeEach(() => {
    shallow = new Shallow(BiomarkerTableDataCardComponent).dontMock(MatTableModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('', async () => {
    await shallow.render({ bind: { data } });
  });
});
