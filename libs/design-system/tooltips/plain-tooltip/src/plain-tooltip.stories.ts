import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PlainTooltipDirective } from './plain-tooltip.directive';
import { MatButtonModule } from '@angular/material/button';

const meta: Meta = {
  title: 'PlainTooltip',
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
      imports: [PlainTooltipDirective, MatButtonModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const Medium: Story = {
  render: (args) => ({
    props: args,
    template: `
      <button mat-flat-button hraPlainTooltip="This is a Plain Tooltip of ${args['size']} variant"
      hraPlainTooltipSize="${args['size']}">
        Try Me!
      </button>
    `,
  }),
};
