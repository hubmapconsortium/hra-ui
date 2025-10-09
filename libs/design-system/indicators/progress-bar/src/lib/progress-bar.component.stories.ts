import { type Meta, type StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar.component';

const meta: Meta<ProgressBarComponent> = {
  component: ProgressBarComponent,
  title: 'Design System/Indicators/Progress Bar',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=3173-10',
    },
  },

  args: {
    color: 'dark',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['dark', 'color'],
    },
  },
};
export default meta;
type Story = StoryObj<ProgressBarComponent>;

export const Default: Story = {};
