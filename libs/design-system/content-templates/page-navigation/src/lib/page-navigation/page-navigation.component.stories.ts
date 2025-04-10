import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { TEST_SECTIONS } from '../page-navigation-demo/page-navigation-demo.component';
import { PageNavigationComponent } from './page-navigation.component';

const meta: Meta<PageNavigationComponent> = {
  component: PageNavigationComponent,
  title: 'Design System/Content Templates/PageNavigation',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=786-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
  args: {
    treeData: TEST_SECTIONS,
  },
};
export default meta;
type Story = StoryObj<PageNavigationComponent>;

export const Primary: Story = {};
