import type { Meta, StoryObj } from '@storybook/angular';
import { LogoComponent } from './logo.component';

const meta: Meta<LogoComponent> = {
  component: LogoComponent,
  title: 'LogoComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=75-4',
    },
  },
};
export default meta;
type Story = StoryObj<LogoComponent>;

export const SmallFTULogo: Story = {
  args: {
    app: 'FTU Explorer',
    size: 'small',
  },
};

export const SmallCDELogo: Story = {
  args: {
    app: 'Cell Distance Explorer',
    size: 'small',
  },
};

export const SmallDashboardsLogo: Story = {
  args: {
    app: 'Dashboards',
    size: 'small',
  },
};

export const LargeCDELogo: Story = {
  args: {
    app: 'Cell Distance Explorer',
    size: 'large',
  },
};
