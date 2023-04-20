import { Meta, Story } from '@storybook/angular';
import { BiomarkerTableComponent, DataCell } from './biomarker-table.component';

export default {
  title: 'BiomarkerTableComponent',
  component: BiomarkerTableComponent,
} as Meta<BiomarkerTableComponent<DataCell>>;

const Template: Story<BiomarkerTableComponent<DataCell>> = (args: BiomarkerTableComponent<DataCell>) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  columns: ['RGMB', 'SOX9', 'CD44', 'LGR5', 'chromosome inavalitentte A'],
  data: [
    [
      'absorptive cell',
      2764,
      {
        color: '#9ca5ee',
        size: 0.56,
        data: [
          [
            {
              label: 'Name',
              value: 'capillary endolitheal cell',
            },
            {
              label: 'ID-UBERON',
              value: '123456',
            },
            {
              label: '#Datasets',
              value: '45',
            },
          ],
          [
            {
              label: 'Name ',
              value: 'endolitheal cell',
            },
            {
              label: 'ID-CL',
              value: 'CL:1234567',
            },
            {
              label: 'MEAN VALUE',
              value: '0.012',
            },
            {
              label: 'ID-HGNC',
              value: 'HGNC:12345',
            },
          ],
        ],
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
  ],
};
