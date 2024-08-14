import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';
import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  component: DividerComponent,
  title: 'DividerComponent',
};
export default meta;
type Story = StoryObj<DividerComponent>;

export const Primary: Story = {
  args: {},
  decorators: [componentWrapperDecorator((story) => `<div style="width: 10rem">${story}</div>`)],
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  decorators: [componentWrapperDecorator((story) => `<div style="height: 10rem">${story}</div>`)],
};
