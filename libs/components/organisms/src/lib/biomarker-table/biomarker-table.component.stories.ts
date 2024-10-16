import { Meta, StoryFn } from '@storybook/angular';
import { BiomarkerTableComponent, DataCell } from './biomarker-table.component';

export default {
  title: 'BiomarkerTableComponent',
  component: BiomarkerTableComponent,
} as Meta<BiomarkerTableComponent<DataCell>>;

const Template: StoryFn<BiomarkerTableComponent<DataCell>> = (args) => ({
  props: args,
});

export const Primary = {
  render: Template,

  args: {
    columns: ['RGMB', 'SOX9', 'CD44', 'LGR5', 'chromosome inavalitentte A'],
    tissueInfo: { id: '555', label: 'sampleDataset' },
    data: [
      [
        'absorptive cell',
        2764,
        {
          color: '#9ca5ee',
          size: 0.56,
          data: {
            cell: '',
            biomarker: '',
            meanExpression: 0,
            dataset_count: 0,
          },
        },
      ],
      [
        'enteroendocrine cell',
        17,
        {
          color: '#00ffb2',
          size: 0.689,
          data: {
            cell: '',
            biomarker: '',
            meanExpression: 0,
            dataset_count: 0,
          },
        },
      ],
      [
        'epithelial stem cell',
        187,
        {
          color: '#00ffb2',
          size: 0.689,
          data: {
            cell: '',
            biomarker: '',
            meanExpression: 0,
            dataset_count: 0,
          },
        },
      ],
      [
        'goblet cell',
        187,
        {
          color: '#00ffb2',
          size: 0.689,
          data: {
            cell: '',
            biomarker: '',
            meanExpression: 0,
            dataset_count: 0,
          },
        },
      ],
    ],
  },
};
