import { AppLogosComponent } from './app-logos.component';

import type { Meta, StoryObj } from '@storybook/angular';
const meta: Meta<AppLogosComponent> = {
  component: AppLogosComponent,
  title: 'AppLogosComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=75-4',
    },
  },
  argTypes: {
    appLink: {
      control: 'select',
      options: [
        'https://apps.humanatlas.io/ftu-explorer/#/',
        'https://apps.humanatlas.io/cde/',
        'https://apps.humanatlas.io/dashboard/',
      ],
    },
    appIcon: {
      control: 'select',
      options: ['assets/logo/ftu_logo.svg', 'assets/logo/cde_logo.svg', 'assets/logo/dashboards_logo.svg'],
    },
    appTitle: {
      control: 'select',
      options: ['FTU Explorer', 'Cell Distance Explorer', 'Dashboards'],
    },
  },
  args: {
    appLink: 'https://apps.humanatlas.io/ftu-explorer/#/',
    appIcon: 'assets/logo/ftu_logo.svg',
    appTitle: 'FTU Explorer',
    appDescription: 'HRA Preview Application',
  },
};
export default meta;
type Story = StoryObj<AppLogosComponent>;

export const Default: Story = {};

export const Fixed: Story = {
  args: {
    variant: 'fixed',
  },
};
