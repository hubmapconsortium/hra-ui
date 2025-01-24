import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { SOCIAL_MEDIA_NAMES, SocialMediaButtonComponent } from './social-media-button.component';

const meta: Meta<SocialMediaButtonComponent> = {
  component: SocialMediaButtonComponent,
  title: 'Design System/Buttons/SocialMediaButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=333-4',
    },
  },
  args: {
    name: 'github',
    size: 'large',
    variant: 'dark',
  },
  argTypes: {
    name: {
      control: 'select',
      options: SOCIAL_MEDIA_NAMES,
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    variant: {
      control: 'select',
      options: ['light', 'dark', 'color'],
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

export const Default: Story = {};
