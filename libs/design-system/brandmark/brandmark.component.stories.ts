import type { Meta, StoryObj } from '@storybook/angular';
import { BrandmarkComponent } from './brandmark.component';

const meta: Meta<BrandmarkComponent> = {
  component: BrandmarkComponent,
  title: 'BrandmarkComponent',
};
export default meta;
type Story = StoryObj<BrandmarkComponent>;

export const Default: Story = {
  args: {},
};
