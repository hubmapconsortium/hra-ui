import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BiomarkerDetailsComponent } from './biomarker-details.component';
import { MatIconModule } from '@angular/material/icon';
import { DataItem } from '@hra-ui/components/molecules';
import { DataRow, DataCell } from '@hra-ui/components/organisms';
import { SourceListActions, SourceListState } from '@hra-ui/state';
import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';

export function createDataItem(label: string, value: string): DataItem {
  return { label, value };
}

export default {
  title: 'BiomarkerDetailsComponent',
  component: BiomarkerDetailsComponent,
  parameters: {
    state: {
      states: [ResourceRegistryState, SourceListState],
      actions: [
        new ResourceRegistryActions.LoadFromYaml('assets/resources/gradient.yml'),
        new ResourceRegistryActions.LoadFromYaml('assets/resources/size.yml'),
        new SourceListActions.Add([{ title: 'foobar', link: 'abc' }]),
      ],
    },
  },
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

const tableColumns = [
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

export const Primary = Template.bind({});
Primary.args = {
  data: data,
  tabs: [
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
  ],
};
