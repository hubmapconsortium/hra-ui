import type { Meta, StoryObj } from '@storybook/angular';
import { BrandLogoComponent } from './brand-logo.component';
const meta: Meta<BrandLogoComponent> = {
  component: BrandLogoComponent,
  title: 'BrandLogoComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/Design-System-Repository?node-id=5097-23013&t=mdJDmeklbfjt0jbX-4',
    },
  },
};
export default meta;
type Story = StoryObj<BrandLogoComponent>;

export const Primary: Story = {
  args: {},
};

export const PrimaryWhite: Story = {
  args: {
    color: '#FFFFFF',
  },
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
    color: '#FFFFFF',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
