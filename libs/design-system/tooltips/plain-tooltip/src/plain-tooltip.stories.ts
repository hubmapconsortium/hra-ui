import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PlainTooltipDirective } from './plain-tooltip.directive';
import { MatButtonModule } from '@angular/material/button';
import { userEvent, within } from 'storybook/test';

const meta: Meta = {
  title: 'Design System/Tooltip/Plain Tooltip',
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
      <button mat-flat-button hraPlainTooltip="Helpful context for this action"
      hraPlainTooltipSize="${args['size']}">
        Hover for details
      </button>
    `,
  }),
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole('button'));
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
  render: Medium.render,
  play: Medium.play,
};
