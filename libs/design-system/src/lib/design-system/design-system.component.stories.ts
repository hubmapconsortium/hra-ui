import type { Meta, StoryObj } from '@storybook/angular';
import { DesignSystemComponent } from './design-system.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DesignSystemComponent> = {
  component: DesignSystemComponent,
  title: 'DesignSystemComponent',
};
export default meta;
type Story = StoryObj<DesignSystemComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/design-system works!/gi)).toBeTruthy();
  },
};
