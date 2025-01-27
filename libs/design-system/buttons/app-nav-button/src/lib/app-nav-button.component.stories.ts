import type { Meta, StoryObj } from '@storybook/angular';
import { AppNavButtonComponent } from './app-nav-button.component';

const apps: Record<string, Story['args']> = {
  'HuBMAP Consortium': {
    icon: 'assets/logo/hubmap.svg',
    tagline: 'HuBMAP Consortium',
    description:
      'HuBMAP all access: Learn about us, our policies, data, and tools. Explore our publications and how to work with us.',
    link: 'https://hubmapconsortium.org/',
  },
  'HubMAP Data Portal': {
    icon: 'assets/logo/data_portal.svg',
    tagline: 'HuBMAP Data Portal',
    description:
      'Explore, visualize and download consortium-generated spatial and single cell data for the human body.',
    link: 'https://portal.hubmapconsortium.org/',
  },
  'Data Portal Workspaces': {
    icon: 'assets/logo/data_portal.svg',
    tagline: 'Data Portal Workspaces',
    description:
      'Access HuBMAP data in a lightweight exploration platform and perform analyses directly within the portal.',
    link: 'https://portal.hubmapconsortium.org/workspaces',
  },
  'Human Reference Atlas': {
    icon: 'assets/logo/hra_small.svg',
    tagline: 'Human Reference Atlas',
    description:
      'Use the HRA Portal to access atlas data, explore atlas functionality, and contribute to the Human Reference Atlas.',
    link: 'https://humanatlas.io/',
  },
  'Exploration User Interface': {
    icon: 'assets/logo/eui.svg',
    tagline: 'Exploration User Interface',
    description: 'Explore and validate spatially registered single-cell datasets in three-dimensions across organs.',
    link: 'https://apps.humanatlas.io/eui/',
  },
  'ASCT+B Reporter': {
    icon: 'assets/logo/asctb-reporter.svg',
    tagline: 'ASCT+B Reporter',
    description:
      'Explore and compare ASCT+B tables and construct validated panels for multiplexed antibody-based imaging (OMAPs) tables.',
    link: 'https://hubmapconsortium.github.io/ccf-asct-reporter/',
  },
  Azimuth: {
    icon: 'assets/logo/azimuth.svg',
    tagline: 'Azimuth',
    description:
      'Azimuth uses a reference dataset to process, analyze, and interpret single-cell RNA-seq or ATAC-seq experiments.',
    link: 'https://azimuth.hubmapconsortium.org/',
  },
  FUSION: {
    icon: 'assets/logo/fusion.svg',
    tagline: 'FUSION',
    description: 'Functional Unit State Identification and Navigation with WSI.',
    link: 'http://fusion.hubmapconsortium.org/?utm_source=hubmap',
  },
  'Antibody Validation Reports': {
    icon: 'assets/logo/antibody-validation-reports.svg',
    tagline: 'Antibody Validation Reports',
    description:
      'Provide antibody details for multiplex imaging assays and capture data requested by journals for manuscript submission.',
    link: 'https://avr.hubmapconsortium.org/',
  },
};

const meta: Meta = {
  component: AppNavButtonComponent,
  title: 'Design System/Buttons/AppNavButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=78-355',
    },
  },
  argTypes: {
    app: {
      control: 'select',
      options: Object.keys(apps),
      mapping: apps,
    },
  },
  args: {
    app: apps['HuBMAP Consortium'],
  },
  render: (args) => ({
    props: args['app'],
  }),
};
export default meta;
type Story = StoryObj<AppNavButtonComponent>;

export const Primary: Story = {};
