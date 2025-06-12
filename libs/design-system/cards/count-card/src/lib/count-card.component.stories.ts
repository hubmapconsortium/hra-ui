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
    icon: 'misc:data',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: [
        'misc:biomarker',
        'misc:cell-type',
        'misc:contribute',
        'misc:data',
        'misc:experts',
        'misc:explore',
        'misc:publications',
        'misc:training',
      ],
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
    icon: 'misc:data',
  },
};
