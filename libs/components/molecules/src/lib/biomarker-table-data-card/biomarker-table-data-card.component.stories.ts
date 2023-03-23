import { Meta, Story } from '@storybook/angular/types-6-0';

import { BiomarkerTableDataCardComponent } from './biomarker-table-data-card.component';

export default {
  title: 'Molecule/BiomarkerTableDataCardComponent',
  component: BiomarkerTableDataCardComponent,
} as Meta<BiomarkerTableDataCardComponent>;

const Template: Story<BiomarkerTableDataCardComponent> = (args) => ({ props: args });

export const Default = Template.bind({});

export const data = [
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

Default.args = {
  data: data,
};
