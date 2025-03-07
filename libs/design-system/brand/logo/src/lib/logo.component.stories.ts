import { Meta, StoryObj } from '@storybook/angular';
import { BrandLogoComponent } from './logo.component';

const meta: Meta<BrandLogoComponent> = {
  component: BrandLogoComponent,
  title: 'Design System/Brand/Logo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=84-802',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'regular'],
    },
  },
  args: {
    size: 'regular',
  },
};

export default meta;
type Story = StoryObj<BrandLogoComponent>;

export const Default: Story = {};

export const WhiteLogoText: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  render: (args) => ({
    props: args,
    styles: ['hra-brand-logo { --hra-brand-logo-text-color: white; }'],
  }),
};
