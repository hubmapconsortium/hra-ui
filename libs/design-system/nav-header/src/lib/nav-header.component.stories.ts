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
  Dashboard: {
    title: 'Dashboard',
    app: 'dashboards',
    link: 'https://apps.humanatlas.io/dashboard-ui/',
    variant: 'sidenav',
  },
};

const sidenavData = [
  {
    category: 'About',
    cards: [
      {
        name: 'HuBMAP Consortium',
        icon: 'assets/logo/hubmap.svg',
        title: 'HuBMAP Consortium',
        description:
          'HuBMAP all access: Learn about us, our policies, data, and tools. Explore our publications and how to work with us.',
        link: 'https://hubmapconsortium.org/',
      },
    ],
  },
  {
    category: 'Data',
    cards: [
      {
        name: 'HubMAP Data Portal',
        icon: 'assets/logo/data_portal.svg',
        title: 'HuBMAP Data Portal',
        description:
          'Explore, visualize and download consortium-generated spatial and single cell data for the human body.',
        link: 'https://portal.hubmapconsortium.org/',
      },
      {
        name: 'Data Portal Workspaces',
        icon: 'assets/logo/data_portal.svg',
        title: 'Data Portal Workspaces',
        description:
          'Access HuBMAP data in a lightweight exploration platform and perform analyses directly within the portal.',
        link: 'https://portal.hubmapconsortium.org/workspaces',
      },
    ],
  },
  {
    category: 'Atlas',
    cards: [
      {
        name: 'Human Reference Atlas',
        icon: 'assets/logo/hra_small.svg',
        title: 'Human Reference Atlas',
        description:
          'Use the HRA Portal to access atlas data, explore atlas functionality, and contribute to the Human Reference Atlas.',
        link: 'https://humanatlas.io/',
      },
      {
        name: 'Exploration User Interface',
        icon: 'assets/logo/hra_small.svg',
        title: 'Exploration User Interface',
        description:
          'Explore and validate spatially registered single-cell datasets in three-dimensions across organs.',
        link: 'https://apps.humanatlas.io/eui/',
      },
      {
        name: 'ASCT+B Reporter',
        icon: 'assets/logo/hra_small.svg',
        title: 'ASCT+B Reporter',
        description:
          'Explore and compare ASCT+B tables and construct validated panels for multiplexed antibody-based imaging (OMAPs) tables.',
        link: 'https://hubmapconsortium.github.io/ccf-asct-reporter/',
      },
    ],
  },
  {
    category: 'Analytics Tools',
    cards: [
      {
        name: 'Azimuth',
        icon: 'assets/logo/azimuth.svg',
        title: 'Azimuth',
        description:
          'Azimuth uses a reference dataset to process, analyze, and interpret single-cell RNA-seq or ATAC-seq experiments.',
        link: 'https://azimuth.hubmapconsortium.org/',
      },
      {
        name: 'FUSION',
        icon: 'assets/logo/fusion.svg',
        title: 'FUSION',
        description: 'Functional Unit State Identification and Navigation with WSI.',
        link: 'http://fusion.hubmapconsortium.org/?utm_source=hubmap',
      },
      {
        name: 'Antibody Validation Reports',
        icon: 'assets/logo/antibody-validation-reports.svg',
        title: 'Antibody Validation Reports',
        description:
          'Provide antibody details for multiplex imaging assays and capture data requested by journals for manuscript submission.',
        link: 'https://avr.hubmapconsortium.org/',
      },
    ],
  },
];

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
        position: relative;
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
    navigationCategories: sidenavData,
  },
};
