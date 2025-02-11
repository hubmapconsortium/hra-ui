import { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  title: 'Design System/Navigation/Header',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=0-1',
    },
    layout: 'fullscreen',
  },
  args: {
    cta: {
      action: 'a',
      description: 'b',
      url: 'c',
    },
    breadcrumbs: [{ name: 'foo' }],
  },
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Primary: Story = {};
