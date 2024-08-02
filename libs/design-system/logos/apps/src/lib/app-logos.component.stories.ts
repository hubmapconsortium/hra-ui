import type { Meta, StoryObj } from '@storybook/angular';
import { AppLogosComponent } from './app-logos.component';

const meta: Meta<AppLogosComponent> = {
  component: AppLogosComponent,
  title: 'AppLogosComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=75-4',
    },
  },
};
export default meta;
type Story = StoryObj<AppLogosComponent>;

export const DefaultFTU: Story = {
  args: {
    appLink: 'https://apps.humanatlas.io/ftu-explorer/#/',
    appIcon: 'assets/logo/ftu_logo.svg',
    appTitle: 'FTU Explorer',
    appDescription: 'HRA Preview Application',
  },
};

export const DefaultCDE: Story = {
  args: {
    appLink: 'https://apps.humanatlas.io/cde/',
    appIcon: 'assets/logo/cde_logo.svg',
    appTitle: 'Cell Distance Explorer',
    appDescription: 'HRA Preview Application',
  },
};

export const DefaultDashboards: Story = {
  args: {
    appLink: 'https://apps.humanatlas.io/dashboard/',
    appIcon: 'assets/logo/dashboards_logo.svg',
    appTitle: 'Dashboards',
    appDescription: 'HRA Preview Application',
  },
};

export const FixedFTU: Story = {
  args: {
    variant: 'fixed',
    appLink: 'https://apps.humanatlas.io/ftu-explorer/#/',
    appIcon: 'assets/logo/ftu_logo.svg',
    appTitle: 'FTU Explorer',
    appDescription: 'HRA Preview Application',
  },
};

export const FixedCDE: Story = {
  args: {
    variant: 'fixed',
    appLink: 'https://apps.humanatlas.io/cde/',
    appIcon: 'assets/logo/cde_logo.svg',
    appTitle: 'Cell Distance Explorer',
    appDescription: 'HRA Preview Application',
  },
};
