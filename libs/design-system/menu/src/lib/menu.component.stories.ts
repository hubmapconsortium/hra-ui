import { Meta, StoryObj } from '@storybook/angular';
import { MenuComponent } from './menu.component';

const meta: Meta = {
  component: MenuComponent,
  title: 'MenuComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=619-1552',
    },
  },
};

export default meta;
type Story = StoryObj<MenuComponent>;

export const Primary: Story = {};
