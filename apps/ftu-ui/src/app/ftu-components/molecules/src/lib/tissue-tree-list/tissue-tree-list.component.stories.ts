import { LinkRegistryState, createLinkId } from '@hra-ui/cdk/state';
import { Meta, StoryObj } from '@storybook/angular';
import { DataNode, TissueTreeListComponent } from './tissue-tree-list.component';

export default {
  title: 'TissueTreeListComponent',
  component: TissueTreeListComponent,
  parameters: {
    state: {
      states: [LinkRegistryState],
    },
  },
} satisfies Meta<TissueTreeListComponent<string, DataNode<string>>>;

type Story = StoryObj<TissueTreeListComponent<string, DataNode<string>>>;

const nodes: Record<string, DataNode<string>> = {
  id1: {
    label: 'Kidney',
    children: ['id2', 'id3'],
  },
  id2: {
    label: 'Ascending thin limb',
    link: createLinkId('id2'),
  },
  id3: {
    label: 'Cortical collecting duct',
    link: createLinkId('id3'),
  },
  id4: {
    label: 'Large Intestine',
    link: createLinkId('id4'),
    children: ['id5'],
  },
  id5: {
    label: 'Crypt of Lieberkuhn',
    link: createLinkId('id5'),
  },
  id6: {
    label: 'Liver',
    children: ['id7'],
  },
  id7: {
    label: 'Liver lobule',
    link: createLinkId('id7'),
  },
};

export const Primary: Story = {
  args: {
    nodes,
  },
};
