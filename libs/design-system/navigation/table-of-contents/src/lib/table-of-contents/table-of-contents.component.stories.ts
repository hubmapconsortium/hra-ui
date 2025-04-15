import { Meta, StoryObj } from '@storybook/angular';

import { TEST_SECTIONS } from '../table-of-contents-demo/table-of-contents-demo.component';
import { TableOfContentsComponent } from './table-of-contents.component';

const meta: Meta<TableOfContentsComponent> = {
  component: TableOfContentsComponent,
  title: 'Design System/Navigation/Table of Contents/Table of Contents',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2571-207',
    },
  },
  args: {
    treeData: TEST_SECTIONS,
  },
};
export default meta;
type Story = StoryObj<TableOfContentsComponent>;

export const Primary: Story = {};
