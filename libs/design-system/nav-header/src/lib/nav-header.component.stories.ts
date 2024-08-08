import { Meta, StoryObj } from '@storybook/angular';
import { NavHeaderComponent } from './nav-header.component';

const meta: Meta<NavHeaderComponent> = {
  component: NavHeaderComponent,
  title: 'NavHeaderComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=0-1',
    },
  },
  args: {
    navInfo: {
      title: 'Cell Distance Explorer',
      icon: 'assets/logo/cde_logo.svg',
      link: 'https://apps.humanatlas.io/cde/',
      description: 'HRA Preview Application',
    },
  },
};

export default meta;
type Story = StoryObj<NavHeaderComponent>;

export const Primary: Story = {
  args: {},
};
