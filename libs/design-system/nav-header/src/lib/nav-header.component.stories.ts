import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { provideDesignSystem } from '../../../src';
import { NavHeaderComponent } from './nav-header.component';

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
    link: 'https://apps.humanatlas.io/ftu-explorer/',
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
      options: ['cde', 'ftu', 'dashboards'],
    },
    variant: {
      control: 'select',
      options: ['basic', 'sidenav'],
    },
    link: {
      control: 'select',
      options: [
        'https://apps.humanatlas.io/cde/',
        'https://apps.humanatlas.io/ftu-explorer/',
        'https://apps.humanatlas.io/dashboard-ui/',
      ],
    },
    title: {
      control: 'select',
      options: Object.keys(apps),
    },
    status: {
      control: 'select',
      options: ['Beta', 'Alpha', 'Preview', undefined],
    },
  },
  render: (args) => ({
    props: args,
    styles: [
      `hra-nav-header {
        height: calc(100vh - 15rem);
      }`,
    ],
  }),
};

export default meta;
type Story = StoryObj<NavHeaderComponent>;

export const Primary: Story = {
  args: {
    app: 'cde',
    variant: 'basic',
    link: 'https://apps.humanatlas.io/cde/',
    title: 'Cell Distance Explorer',
    status: undefined,
  },
};
