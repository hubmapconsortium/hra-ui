import { NavHeaderButtonsComponent } from './nav-header-buttons.component';

import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

const meta: Meta<NavHeaderButtonsComponent> = {
  component: NavHeaderButtonsComponent,
  title: 'NavHeaderButtonsComponent',
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [ButtonsModule],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=75-4',
    },
  },
  argTypes: {
    appLink: {
      control: 'select',
      options: [
        'https://apps.humanatlas.io/ftu-explorer/#/',
        'https://apps.humanatlas.io/cde/',
        'https://apps.humanatlas.io/dashboard/',
      ],
    },
    app: {
      control: 'select',
      options: ['ftu', 'cde', 'dashboards'],
    },
    appTitle: {
      control: 'select',
      options: ['FTU Explorer', 'Cell Distance Explorer', 'Dashboard'],
    },
    variant: {
      control: 'select',
      options: ['basic', 'sidenav'],
    },
    brandmark: {
      control: 'boolean',
      options: [true, false],
    },
    appStatus: {
      control: 'select',
      options: ['Beta', 'Alpha', 'Preview', undefined],
    },
  },
};
export default meta;
type Story = StoryObj<NavHeaderButtonsComponent>;

export const Default: Story = {
  args: {
    variant: 'sidenav',
    brandmark: true,
    appLink: 'https://apps.humanatlas.io/ftu-explorer/#/',
    app: 'ftu',
    appTitle: 'FTU Explorer',
  },
};
