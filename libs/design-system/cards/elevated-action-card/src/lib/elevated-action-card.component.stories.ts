import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { ElevatedActionCardComponent } from './elevated-action-card.component';

const meta: Meta = {
  title: 'Design System/Cards/Action Card/Elevated Action Card',
  component: ElevatedActionCardComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Explorer-Components?node-id=1309-2257',
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
type Story = StoryObj<ElevatedActionCardComponent>;

export const Default: Story = {
  args: {
    productTitle: 'Small Title',
    imageUrl: 'assets/ui-images/placeholder.png',
    description: 'This is a placeholder description (>125 characters.)',
    componentName: 'Large Title',
    hideEmbedButton: false,
  },
};
