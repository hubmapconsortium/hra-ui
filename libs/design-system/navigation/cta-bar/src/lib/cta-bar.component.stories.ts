import { Meta, StoryObj } from '@storybook/angular';
import { CtaBarComponent } from './cta-bar.component';

const meta: Meta<CtaBarComponent> = {
  component: CtaBarComponent,
  title: 'Design System/Navigation/CtaBar',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1732-12479',
    },
  },
  args: {
    description: 'Join the Human Reference Atlas Working Group:',
    action: 'Register',
    url: 'https://google.com',
  },
};

export default meta;
type Story = StoryObj<CtaBarComponent>;

export const Primary: Story = {};
