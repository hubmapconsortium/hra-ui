import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '../../../src/index';
import { NavHeaderComponent } from './nav-header.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const apps: Record<string, Story['args']> = {
  'Cell Distance Explorer': {
    title: 'Cell Distance Explorer',
    app: 'cde',
    link: 'https://apps.humanatlas.io/cde/',
    variant: 'basic',
  },
  'FTU Explorer': {
    title: 'FTU Explorer',
    app: 'ftu',
    link: 'https://apps.humanatlas.io/cde/',
    variant: 'basic',
  },
  Dashboards: {
    title: 'Dashboards',
    app: 'dashboards',
    link: 'https://apps.humanatlas.io/dashboard-ui/',
    variant: 'sidenav',
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
