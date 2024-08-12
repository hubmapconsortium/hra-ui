import { AppsCardComponent } from './apps-card.component';

import type { Meta, StoryObj } from '@storybook/angular';
const meta: Meta<AppsCardComponent> = {
  component: AppsCardComponent,
  title: 'AppsCardComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=78-355',
    },
  },
  argTypes: {
    icon: {
      control: 'select',
      options: [
        'assets/logo/hubmap.svg',
        'assets/logo/data_portal.svg',
        'assets/logo/hra_small.svg',
        'assets/logo/eui.svg',
        'assets/logo/asctb-reporter.svg',
        'assets/logo/azimuth.svg',
        'assets/logo/fusion.svg',
        'assets/logo/antibody-validation-reports.svg',
      ],
    },
    title: {
      control: 'select',
      options: [
        'HuBMAP Consortium',
        'HuBMAP Data Portal',
        'Data Portal Workspaces',
        'Human Reference Atlas',
        'Exploration User Interface',
        'ASCT+B Reporter',
        'Azimuth',
        'FUSION',
        'Antibody Validation Reports',
      ],
    },
    description: {
      control: 'select',
      options: [
        'HuBMAP all access: Learn about us, our policies, data, and tools. Explore our publications and how to work with us.',
        'Explore, visualize and download consortium-generated spatial and single cell data for the human body.',
        'Access HuBMAP data in a lightweight exploration platform and perform analyses directly within the portal.',
        'Use the HRA Portal to access atlas data, explore atlas functionality, and contribute to the Human Reference Atlas.',
        'Explore and validate spatially registered single-cell datasets in three-dimensions across organs.',
        'Explore and compare ASCT+B tables and construct validated panels for multiplexed antibody-based imaging (OMAPs) tables.',
        'Azimuth uses a reference dataset to process, analyze, and interpret single-cell RNA-seq or ATAC-seq experiments.',
        'Functional Unit State Identification and Navigation with WSI.',
        'Provide antibody details for multiplex imaging assays and capture data requested by journals for manuscript submission.',
      ],
    },
    link: {
      control: 'select',
      options: [
        'https://hubmapconsortium.org/',
        'https://portal.hubmapconsortium.org/',
        'https://portal.hubmapconsortium.org/workspaces',
        'https://humanatlas.io/',
        'https://apps.humanatlas.io/eui/',
        'https://hubmapconsortium.github.io/ccf-asct-reporter/',
        'https://azimuth.hubmapconsortium.org/',
        'http://fusion.hubmapconsortium.org/?utm_source=hubmap',
        'https://avr.hubmapconsortium.org/',
      ],
    },
  },
};
export default meta;
type Story = StoryObj<AppsCardComponent>;

export const Primary: Story = {
  args: {
    icon: 'assets/logo/hra_small.svg',
    title: 'Human Reference Atlas',
    link: 'https://humanatlas.io/',
    description:
      'Use the HRA Portal to access atlas data, explore atlas functionality, and contribute to the Human Reference Atlas.',
  },
};
