import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '../../../src/index';
import { NavHeaderComponent } from './nav-header.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const apps: Record<string, Story['args']> = {
  'Cell Distance Explorer': {
    title: 'Cell Distance Explorer',
    icon: 'assets/logo/cde_logo.svg',
    link: 'https://apps.humanatlas.io/cde/',
    variant: 'basic',
  },
  'FTU Explorer': {
    title: 'FTU Explorer',
    icon: 'assets/logo/ftu_logo.svg',
    link: 'https://apps.humanatlas.io/cde/',
    variant: 'basic',
  },
  Dashboards: {
    title: 'Dashboards',
    icon: 'assets/logo/dashboards_logo.svg',
    link: 'https://apps.humanatlas.io/dashboard-ui/',
    variant: 'sidenav',
  },
  'Atlas Applications': {
    title: 'Atlas Applications',
    icon: 'assets/logo/atlas_apps.svg',
    link: 'https://apps.humanatlas.io/',
  },
};

const meta: Meta = {
  component: NavHeaderComponent,
  title: 'NavHeaderComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=0-1',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem(), importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  argTypes: {
    app: {
      control: 'select',
      options: Object.keys(apps),
      mapping: apps,
    },
  },
  args: {
    app: apps['Cell Distance Explorer'],
  },
  render: (args) => ({
    props: args['app'],
    styles: [
      `hra-nav-header {
        height: calc(100vh - 15rem);
      }`,
    ],
  }),
};

export default meta;
type Story = StoryObj<NavHeaderComponent>;

export const Primary: Story = {};
