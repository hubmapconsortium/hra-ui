import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipCardComponent } from './tooltip-card.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TooltipCardComponent> = {
  component: TooltipCardComponent,
  title: 'TooltipCardComponent',
};
export default meta;
type Story = StoryObj<TooltipCardComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/TooltipCardComponent works!/gi)).toBeTruthy();
  },
};
