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
};
export default meta;
type Story = StoryObj<AppsCardComponent>;

export const Primary: Story = {
  args: {
    icon: 'assets/logo/hra_small.svg',
    title: 'Human Reference Atlas',
    description:
      'Use the HRA Portal to access atlas data, explore atlas functionality, and contribute to the Human Reference Atlas.',
  },
};

export const HubmapDataPortal: Story = {
  args: {
    icon: 'assets/logo/data_portal.svg',
    title: 'HuBMAP Data Portal',
    description:
      'Explore, visualize and download consortium-generated spatial and single cell data for the human body.',
  },
};

export const DataPortalWorkspaces: Story = {
  args: {
    icon: 'assets/logo/data_portal.svg',
    title: 'Data Portal Workspaces',
    description:
      'Access HuBMAP data in a lightweight exploration platform and perform analyses directly within the portal.',
  },
};
