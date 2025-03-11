import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { SocialMediaButtonComponent } from './social-media-button.component';
import { SOCIAL_IDS } from './static-data/parsed';

const meta: Meta<SocialMediaButtonComponent> = {
  component: SocialMediaButtonComponent,
  title: 'Design System/Buttons/Social Media Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=333-4',
    },
  },
  args: {
    id: SOCIAL_IDS[0],
    size: 'large',
    variant: 'dark',
  },
  argTypes: {
    id: {
      control: 'select',
      options: SOCIAL_IDS,
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
