import { Meta, StoryObj } from '@storybook/angular';

import { ButtonToggleComponent } from './button-toggle.component';

const meta: Meta<ButtonToggleComponent> = {
  component: ButtonToggleComponent,
  title: 'ButtonToggleComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=853-284',
    },
  },
};
export default meta;
type Story = StoryObj<ButtonToggleComponent>;

export const Default: Story = {};
