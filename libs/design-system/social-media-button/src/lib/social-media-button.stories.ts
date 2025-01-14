import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { SocialMediaButtonComponent } from './social-media-button.component';

const meta: Meta<SocialMediaButtonComponent> = {
  component: SocialMediaButtonComponent,
  title: 'SocialMediaButtonComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=333-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<SocialMediaButtonComponent>;

export const Default: Story = {
  args: {
    name: 'github',
    size: 'large',
  },
  argTypes: {
    name: {
      control: 'select',
      options: ['email', 'github', 'facebook', 'instagram', 'linkedin', 'x', 'youtube'],
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
  },
};
