import { Meta, StoryObj } from '@storybook/angular';
import { NavHeaderComponent } from './nav-header.component';

const apps: Record<string, Story['args']> = {
  'Cell Distance Explorer': {
    title: 'Cell Distance Explorer',
    icon: 'assets/logo/cde_logo.svg',
    link: 'https://apps.humanatlas.io/cde/',
    description: 'HRA Preview Application',
  },
  'FTU Explorer': {
    title: 'FTU Explorer',
    icon: 'assets/logo/ftu_logo.svg',
    link: 'https://apps.humanatlas.io/cde/',
    description: 'HRA Preview Application',
  },
  Dashboards: {
    title: 'Dashboards',
    icon: 'assets/logo/dashboards_logo.svg',
    link: 'https://apps.humanatlas.io/dashboard-ui/',
    description: 'HRA Preview Application',
  },
  'Atlas Applications': {
    title: 'Atlas Applications',
    icon: 'assets/logo/atlas_apps.svg',
    link: 'https://apps.humanatlas.io/',
    description: 'HRA Preview Application',
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
  }),
};

export default meta;
type Story = StoryObj<NavHeaderComponent>;

export const Primary: Story = {};
