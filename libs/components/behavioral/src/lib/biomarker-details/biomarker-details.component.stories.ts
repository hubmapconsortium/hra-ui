import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BiomarkerDetailsComponent } from './biomarker-details.component';
import { MatIconModule } from '@angular/material/icon';
import { DataItem } from '@hra-ui/components/molecules';
import { DataRow, DataCell } from '@hra-ui/components/organisms';

function createDataItem(label: string, value: string): DataItem {
  return { label, value };
}

export default {
  title: 'BiomarkerDetailsComponent',
  component: BiomarkerDetailsComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
} as Meta<BiomarkerDetailsComponent>;

const Template: Story<BiomarkerDetailsComponent> = (args: BiomarkerDetailsComponent) => ({
  props: args,
});

const data = [
  [
    createDataItem('Functional Tissue Unit Name', 'Liver lobule'),
    createDataItem('New Uberon ID', 'UBERON1:0022285'),
    createDataItem('#Datasets1', '4'),
  ],
  [createDataItem('Cell Type Name', 'absorptive cell'), createDataItem('CL ID', 'CL:1119017')],
  [createDataItem('New Gene Name', 'RGMB'), createDataItem('Mean Expression Value', '0.0643')],
];

const tableColumns = ['RGMB', 'SOX9', 'CD44', 'LGR5', 'chromosome inavalitentte A'];

const tableData: DataRow<DataCell>[] = [
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

export const Primary = Template.bind({});
Primary.args = {
  data: data,
  gradient: [
    { color: '#00385F', percentage: 0 },
    { color: '#63B1D3', percentage: 49.78 },
    { color: '#EDFAFD', percentage: 100 },
  ],
  sizes: [
    {
      label: '0%',
      radius: 0.5,
    },
    {
      label: '50%',
      radius: 1,
    },
    {
      label: '100%',
      radius: 1.5,
    },
  ],
  sources: [
    {
      title: 'Owner Title',
      link: 'google.com',
    },
    {
      title:
        '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
      link: 'google.com',
    },
  ],
  tableColumns: tableColumns,
  tableData: tableData,
};
