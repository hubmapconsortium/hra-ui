import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { ImageModalComponent } from './image-modal.component';

const meta: Meta = {
  component: ImageModalComponent,
  title: 'Design System/Modal/ImageModalComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=13849-39764&t=iEZrhvSNfKu1IT7o-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<ImageModalComponent>;

export const Default: Story = {
  args: {
    modalTitle: 'Modal label',
    imageUrl: 'assets/ui-images/placeholder.png',
    altText: 'placeholder image',
  },
};
