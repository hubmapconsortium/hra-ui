import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TissueTreeListComponent } from './tissue-tree-list.component';

export default {
  title: 'TissueTreeListComponent',
  component: TissueTreeListComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<TissueTreeListComponent>;

const Template: Story<TissueTreeListComponent> = (args: TissueTreeListComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  tissueTree: [
    {
      label: 'Kidney',
      tissues: [
        { label: 'Ascending thin limb' },
        { label: 'Cortical collecting duct' },
        { label: 'Collecting duct(inner medulla)' },
      ],
    },
    {
      label: 'Large Intestine',
      tissues: [{ label: 'Crypt of Lieberkuhn' }],
    },
    {
      label: 'Liver',
      tissues: [{ label: 'Liver lobule' }],
    },
  ],
};
