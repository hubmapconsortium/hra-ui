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
  columns: ['RGMB', 'SOX9', 'CD44', 'LGR5'],
  data: [
    ['absorptive cell', 2764, undefined, undefined],
    ['enteroendocrine cell', 17, undefined, undefined],
    [
      'epithelial stem cell',
      187,
      {
        color: '#00385F',
        size: 1,
        data: [],
      },
      {
        color: '#328BB8',
        size: 1,
        data: [],
      },
    ],
    ['goblet cell', undefined, undefined, undefined],
  ],
};
