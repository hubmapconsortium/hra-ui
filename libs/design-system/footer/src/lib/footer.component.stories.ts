import type { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  component: FooterComponent,
  title: 'FooterComponent',
};
export default meta;
type Story = StoryObj<FooterComponent>;

export const Primary: Story = {
  args: {},
};
