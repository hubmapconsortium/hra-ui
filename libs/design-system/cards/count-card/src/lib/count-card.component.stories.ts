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
    showSuffix: true,
    label: 'label text',
    iconType: 'misc',
    icon: 'data',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ['biomarker', 'cell-type', 'contribute', 'data', 'experts', 'explore', 'publications', 'training'],
    },
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
    showSuffix: true,
    label: 'label text',
    iconType: 'misc',
    icon: 'data',
  },
};
