import type { Meta, StoryObj } from '@storybook/angular';
import { BrandLogoComponent } from './brand-logo.component';
const meta: Meta<BrandLogoComponent> = {
  component: BrandLogoComponent,
  title: 'BrandLogoComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=84-802',
    },
  },
};
export default meta;
type Story = StoryObj<BrandLogoComponent>;

export const Primary: Story = {
  args: {},
};

export const PrimaryWhite: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Small: Story = {
  args: {
    small: true,
  },
};

export const SmallWhite: Story = {
  args: {
    small: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
