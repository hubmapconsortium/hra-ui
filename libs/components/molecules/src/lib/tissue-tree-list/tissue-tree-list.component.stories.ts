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
  treeList: [
    {
      name: 'Kidney',
      children: [
        { name: 'Ascending thin limb' },
        { name: 'Cortical collecting duct' },
        { name: 'Collecting duct(inner medulla)' },
      ],
    },
    {
      name: 'Large Intestine',
      children: [{ name: 'Crypt of Lieberkuhn' }],
    },
    {
      name: 'Liver',
      children: [{ name: 'Liver lobule' }],
    },
  ],
};
