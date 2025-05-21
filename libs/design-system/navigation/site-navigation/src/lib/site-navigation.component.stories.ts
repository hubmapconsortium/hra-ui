import { Meta, StoryObj } from '@storybook/angular';
import { SiteNavigationComponent } from './site-navigation.component';

const meta: Meta<SiteNavigationComponent> = {
  component: SiteNavigationComponent,
  title: 'Design System/Navigation/Site Navigation',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1819-14983',
    },
  },
};

export default meta;
type Story = StoryObj<SiteNavigationComponent>;

export const Primary: Story = {
  args: {},
};
