import { Meta, StoryObj } from '@storybook/angular';

import { TEST_SECTIONS } from '../page-navigation-demo/page-navigation-demo.component';
import { PageNavigationComponent } from './page-navigation.component';

const meta: Meta<PageNavigationComponent> = {
  component: PageNavigationComponent,
  title: 'Design System/Content Templates/Page Navigation',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=786-4',
    },
  },
  args: {
    treeData: TEST_SECTIONS,
  },
};
export default meta;
type Story = StoryObj<PageNavigationComponent>;

export const Primary: Story = {};
