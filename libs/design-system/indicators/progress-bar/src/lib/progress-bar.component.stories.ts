import { MatProgressBarModule } from '@angular/material/progress-bar';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ProgressBarColorDirective } from './progress-bar-color.directive';

const meta: Meta = {
  title: 'Design System/Indicators/Progress Bar',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1209-424',
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
  decorators: [moduleMetadata({ imports: [MatProgressBarModule, ProgressBarColorDirective] })],
  render: (args) => ({
    props: args,
    template: `<mat-progress-bar mode="indeterminate" [hraProgressBarColor]="color" />`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
