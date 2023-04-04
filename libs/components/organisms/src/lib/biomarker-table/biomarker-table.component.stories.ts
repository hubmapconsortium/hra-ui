import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BiomarkerTableComponent, DataCell } from './biomarker-table.component';

export default {
  title: 'BiomarkerTableComponent',
  component: BiomarkerTableComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
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
              label: 'Functional Tissue Unit Name',
              value: 'Renal Corpuscle',
            },
            {
              label: 'Uberon ID',
              value: 'UBERON:0001229',
            },
            {
              label: '#Datasets',
              value: '24',
            },
          ],
          [
            {
              label: 'Name Of Cell Type ',
              value: 'example cell',
            },
            {
              label: 'ID-CL',
              value: 'CL:1234567',
            },
            {
              label: 'Cells Number',
              value: '171',
            },
          ],
          [
            {
              label: 'Name of Gene',
              value: 'ABCD',
            },
            {
              label: 'ID-HGNC',
              value: 'HGNC:12345',
            },
            {
              label: 'MEAN VALUE',
              value: '0.012',
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
