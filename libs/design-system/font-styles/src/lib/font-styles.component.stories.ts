import type { Meta, StoryObj } from '@storybook/angular';
import { FontStylesComponent } from './font-styles.component';

const meta: Meta<FontStylesComponent> = {
  component: FontStylesComponent,
  title: 'FontStylesComponent',
};
export default meta;
type Story = StoryObj<FontStylesComponent>;

export const Primary: Story = {
  args: {},
};
