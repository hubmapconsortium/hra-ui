import { type Meta, type StoryObj } from '@storybook/angular';
import { ProgressSpinnerComponent } from './progress-spinner.component';

const meta: Meta<ProgressSpinnerComponent> = {
  component: ProgressSpinnerComponent,
  title: 'Design System/Indicators/Progress Spinner',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=3173-10',
    },
  },

  args: {
    size: 'small',
    color: 'dark',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    color: {
      control: 'select',
      options: ['dark', 'light', 'color'],
    },
  },
};
export default meta;
type Story = StoryObj<ProgressSpinnerComponent>;

export const Default: Story = {};
