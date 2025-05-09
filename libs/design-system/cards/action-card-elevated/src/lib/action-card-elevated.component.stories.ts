import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { ActionCardElevatedComponent } from './action-card-elevated.component';

const meta: Meta = {
  title: 'Design System/Cards/Action Card/Elevated Action Card',
  component: ActionCardElevatedComponent,
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
type Story = StoryObj<ActionCardElevatedComponent>;

export const Default: Story = {
  args: {
    productTitle: 'Small Label',
    imageUrl: 'assets/ui-images/placeholder.png',
    description:
      'This is a placeholder one sentence short description and ideally it contains less than 125 characters.',
    componentName: 'Large Label',
    hideEmbedButton: false,
  },
};
