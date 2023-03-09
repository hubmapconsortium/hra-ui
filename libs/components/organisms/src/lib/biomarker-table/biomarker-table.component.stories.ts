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
  columns: [
    { label: 'Cell Type', dataType: 'text' },
    { label: 'Cell Count', dataType: 'numeric' },
    { label: 'RGMB', dataType: 'object' },
    { label: 'SOX9', dataType: 'object' },
    { label: 'CD44', dataType: 'object' },
    { label: 'LGR5', dataType: 'object' },
  ],
  data: [
    ['absorptive cell', 2764, undefined, undefined],
    ['enteroendocrine cell', 17, undefined, undefined],
    [
      'epithelial stem cell',
      187,
      {
        name: 'Renal Corpuscle',
        uberonId: 'UBERON:0001229',
        numberOfDatasets: 24,
        cellTypeName: 'parietal epithelial cell',
        clId: 'CL:1000452',
        numberOfCells: 5758,
        geneName: 'VCAM1',
        hgncId: 'HGNC:26896',
        meanExpressionValue: 0.879127,
      },
      {
        name: 'Renal Corpuscle',
        uberonId: 'UBERON:0001229',
        numberOfDatasets: 24,
        cellTypeName: 'parietal epithelial cell',
        clId: 'CL:1000452',
        numberOfCells: 5758,
        geneName: 'VCAM1',
        hgncId: 'HGNC:567567',
        meanExpressionValue: 0.744578,
      },
    ],
    ['goblet cell', undefined, undefined, undefined],
  ],
};
