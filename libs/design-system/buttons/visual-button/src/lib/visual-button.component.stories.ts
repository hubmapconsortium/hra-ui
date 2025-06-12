import { type Meta, type StoryObj } from '@storybook/angular';
import { VisualButtonComponent } from './visual-button.component';

const meta: Meta<VisualButtonComponent> = {
  component: VisualButtonComponent,
  title: 'Design System/Buttons/Visual Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2146-43&t=Uy1zokqqQoB0I0HX-1',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['bottom', 'top'],
    },
  },
  args: {
    label: 'Visual Button',
    imageUrl: 'assets/ui-images/placeholder.png',
    variant: 'bottom',
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<VisualButtonComponent>;

export const Default: Story = {};
