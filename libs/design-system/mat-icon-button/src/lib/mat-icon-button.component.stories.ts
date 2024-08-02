import type { Meta, StoryObj } from '@storybook/angular';
import { MatIconButtonComponent } from './mat-icon-button.component';

const meta: Meta<MatIconButtonComponent> = {
  component: MatIconButtonComponent,
  title: 'MatIconButtonComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=24-876',
    },
  },
};
export default meta;
type Story = StoryObj<MatIconButtonComponent>;

export const Small: Story = {
  args: {
    size: 'small',
    icon: 'keyboard_arrow_up',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    icon: 'keyboard_arrow_up',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    icon: 'keyboard_arrow_up',
  },
};
