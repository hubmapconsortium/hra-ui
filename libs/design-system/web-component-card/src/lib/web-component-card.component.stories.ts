import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { WebComponentCardComponent } from './web-component-card.component';

const meta: Meta = {
  title: 'WebComponentCardComponent',
  decorators: [
    moduleMetadata({
      imports: [WebComponentCardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<WebComponentCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: ``,
    styles: [``],
  }),
};
