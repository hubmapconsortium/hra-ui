import { Meta, StoryObj } from '@storybook/angular';

import { OutlineDefaultCardComponent } from './outline-default-card.component';

const meta: Meta<OutlineDefaultCardComponent> = {
  component: OutlineDefaultCardComponent,
  title: 'Design System/Cards/Outline Default',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=7608-66135&t=5pIJCpRzbFAJN4yy-4',
    },
  },
};
export default meta;
type Story = StoryObj<OutlineDefaultCardComponent>;

export const Default: Story = {
  args: {
    logo: '3d-organ',
    description: 'This is a placeholder description (>125 characters.)',
    tagline: 'Web Component Name',
    hideEmbedButton: false,
  },
};
