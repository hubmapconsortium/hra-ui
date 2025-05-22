import { Meta, StoryObj } from '@storybook/angular';

import { ActionCardOutlineDefaultComponent } from './action-card-outline-default.component';

const meta: Meta<ActionCardOutlineDefaultComponent> = {
  component: ActionCardOutlineDefaultComponent,
  title: 'Design System/Cards/Action Card/Outline Default Action Card',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=6123-27683&t=KrvlsowH9Y8kLBqQ-4',
    },
  },
};
export default meta;
type Story = StoryObj<ActionCardOutlineDefaultComponent>;

export const Default: Story = {
  args: {
    app: 'asctb-reporter',
    description: 'Short description about this Human Reference Atlas item. It must be less than 125 characters.',
    tagline: 'Card Label',
    leftActionName: 'Action',
    leftActionUrl: 'http://www.google.com',
    rightActionName: 'Action',
    rightActionUrl: 'http://www.google.com',
  },
};
