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
    ['epithelial stem cell', 187, 'object', 'object'],
    ['goblet cell', undefined, undefined, undefined],
  ],
};
