import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '../../../src/index';
import { NavHeaderComponent } from './nav-header.component';

const APP_DESCRIPTION = 'HRA Preview Application';
const apps: Record<string, Story['args']> = {
  'Cell Distance Explorer': {
    title: 'Cell Distance Explorer',
    icon: 'assets/logo/cde_logo.svg',
    link: 'https://apps.humanatlas.io/cde/',
    description: APP_DESCRIPTION,
  },
  'FTU Explorer': {
    title: 'FTU Explorer',
    icon: 'assets/logo/ftu_logo.svg',
    link: 'https://apps.humanatlas.io/cde/',
    description: APP_DESCRIPTION,
  },
  Dashboards: {
    title: 'Dashboards',
    icon: 'assets/logo/dashboards_logo.svg',
    link: 'https://apps.humanatlas.io/dashboard-ui/',
    description: APP_DESCRIPTION,
  },
  'Atlas Applications': {
    title: 'Atlas Applications',
    icon: 'assets/logo/atlas_apps.svg',
    link: 'https://apps.humanatlas.io/',
    description: APP_DESCRIPTION,
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
      providers: [provideDesignSystem()],
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
  }),
};

export default meta;
type Story = StoryObj<NavHeaderComponent>;

export const Primary: Story = {};
