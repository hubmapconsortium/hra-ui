import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { ActionCardFlatComponent } from './action-card-flat.component';

const meta: Meta = {
  title: 'Design System/Cards/Action Card old/Flat Action Card',
  component: ActionCardFlatComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=6123-27683&t=KrvlsowH9Y8kLBqQ-4',
    },
  },
  argTypes: {
    webComponentName: {
      control: 'select',
      options: ['Component Name', undefined],
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<ActionCardFlatComponent>;

export const Default: Story = {
  args: {
    imageUrl: 'assets/ui-images/placeholder.png',
    description: 'Supporting text providing concise details about this card.',
    componentName: 'Card Tagline',
    leftActionName: 'Label',
    leftActionUrl: 'http://www.google.com',
    rightActionName: 'Label',
    rightActionUrl: 'http://www.google.com',
  },
};
