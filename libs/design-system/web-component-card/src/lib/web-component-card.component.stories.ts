import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { WebComponentCardComponent } from './web-component-card.component';

const meta: Meta = {
  title: 'WebComponentCardComponent',
  component: WebComponentCardComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Explorer-Components?node-id=1309-2257',
    },
  },
  argTypes: {
    webComponentName: {
      control: 'select',
      options: ['Web Component Name', undefined],
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<WebComponentCardComponent>;

export const Default: Story = {
  args: {
    productTitle: 'Product Title',
    imageUrl: 'assets/ui-images/placeholder.png',
    description: 'This is a placeholder description (>125 characters.)',
    webComponentName: 'Web Component Name',
    disableButton: false,
  },
};
