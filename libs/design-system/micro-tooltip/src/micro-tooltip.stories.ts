import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { MicroTooltipDirective } from './micro-tooltip.directive';
import { MatButtonModule } from '@angular/material/button';

const meta: Meta = {
  title: 'MicroTooltip',
  args: {
    size: 'medium',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MicroTooltipDirective, MatButtonModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const Medium: Story = {
  render: (args) => ({
    props: args,
    template: `
      <button mat-flat-button hraMicroTooltip="This is a Micro Tooltip of ${args['size']} variant"
      hraMicroTooltipSize="${args['size']}">
        Try Me!
      </button>
    `,
  }),
};
