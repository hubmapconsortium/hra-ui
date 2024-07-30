import type { Meta, StoryObj } from '@storybook/angular';
import { LogosAppsComponent } from './logos-apps.component';

const meta: Meta<LogosAppsComponent> = {
  component: LogosAppsComponent,
  title: 'LogosAppsComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=75-4',
    },
  },
};
export default meta;
type Story = StoryObj<LogosAppsComponent>;

export const DefaultFTU: Story = {
  args: {
    appLink: 'https://apps.humanatlas.io/ftu-explorer/#/',
    appIcon: 'logo/ftu_logo.svg',
    appTitle: 'FTU Explorer',
    appDescription: 'HRA Preview Application',
  },
};

export const DefaultCDE: Story = {
  args: {
    appLink: 'https://apps.humanatlas.io/cde/',
    appIcon: 'logo/cde_logo.svg',
    appTitle: 'Cell Distance Explorer',
    appDescription: 'HRA Preview Application',
  },
};

export const DefaultDashboards: Story = {
  args: {
    appLink: 'https://apps.humanatlas.io/dashboard/',
    appIcon: 'logo/dashboards_logo.svg',
    appTitle: 'Dashboards',
    appDescription: 'HRA Preview Application',
  },
};

export const FixedFTU: Story = {
  args: {
    variant: 'fixed',
    appLink: 'https://apps.humanatlas.io/ftu-explorer/#/',
    appIcon: 'logo/ftu_logo.svg',
    appTitle: 'FTU Explorer',
    appDescription: 'HRA Preview Application',
  },
};

export const FixedCDE: Story = {
  args: {
    variant: 'fixed',
    appLink: 'https://apps.humanatlas.io/cde/',
    appIcon: 'logo/cde_logo.svg',
    appTitle: 'Cell Distance Explorer',
    appDescription: 'HRA Preview Application',
  },
};
