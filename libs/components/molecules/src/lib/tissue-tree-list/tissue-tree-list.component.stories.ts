import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TissueTreeListComponent } from './tissue-tree-list.component';
import { DataNode } from './tissue-tree-list.component';

export default {
  title: 'TissueTreeListComponent',
  component: TissueTreeListComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<TissueTreeListComponent<DataNode>>;

const Template: Story<TissueTreeListComponent<DataNode>> = (args: TissueTreeListComponent<DataNode>) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  nodes: {
    id1: {
      label: 'Kidney',
      children: ['id2', 'id3'],
    },
    id2: {
      label: 'Ascending thin limb',
    },
    id3: {
      label: 'Cortical collecting duct',
    },
    id4: {
      label: 'Large Intestine',
      children: ['id5'],
    },
    id5: {
      label: 'Crypt of Lieberkuhn',
    },
    id6: {
      label: 'Liver',
      children: ['id7'],
    },
    id7: {
      label: 'Liver lobule',
    },
  },
};
