import { Meta, StoryObj } from '@storybook/angular';
import { CountCardComponent } from './count-card.component';

const meta: Meta<CountCardComponent> = {
  component: CountCardComponent,
  title: 'Design System/Cards/Count Card',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=8607-27441',
    },
  },
  args: {
    count: 250,
    showSuffix: '+',
    label: 'label text',
    categoryIcon: 'data',
  },
  render: (args) => ({
    props: args,
  }),
};

export default meta;
type Story = StoryObj<CountCardComponent>;

export const Default: Story = {
  args: {
    count: 250,
    showSuffix: '+',
    label: 'label text',
    categoryIcon: 'data',
  },
};
