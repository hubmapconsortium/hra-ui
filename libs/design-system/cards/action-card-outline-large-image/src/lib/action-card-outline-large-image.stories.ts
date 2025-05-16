import { Meta, StoryObj } from '@storybook/angular';

import { ActionCardOutlineLargeImageComponent } from './action-card-outline-large-image.component';

const meta: Meta<ActionCardOutlineLargeImageComponent> = {
  component: ActionCardOutlineLargeImageComponent,
  title: 'Design System/Cards/Action Card/Outline Large Image Action Card',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=6123-27683&t=KrvlsowH9Y8kLBqQ-4',
    },
  },
};
export default meta;
type Story = StoryObj<ActionCardOutlineLargeImageComponent>;

export const Default: Story = {
  args: {
    imageUrl: 'assets/ui-images/placeholder.png',
    description: 'Short description about this Human Reference Atlas item. It must be less than 125 characters.',
    tagline: 'Card name',
    actionName: 'Action',
    actionUrl: 'http://www.google.com',
  },
};
