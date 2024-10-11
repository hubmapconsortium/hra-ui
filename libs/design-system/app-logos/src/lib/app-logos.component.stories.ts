import { AppLogosComponent } from './app-logos.component';

import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonModule } from '@hra-ui/design-system/button';
const meta: Meta<AppLogosComponent> = {
  component: AppLogosComponent,
  title: 'AppLogosComponent',
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [ButtonModule],
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
      options: ['FTU Explorer', 'Cell Distance Explorer', 'Dashboards'],
    },
    variant: {
      control: 'select',
      options: ['basic', 'sidenav'],
    },
    brandmark: {
      control: 'boolean',
      options: [true, false],
    },
  },
  args: {
    appLink: 'https://apps.humanatlas.io/ftu-explorer/#/',
    app: 'ftu',
    appTitle: 'FTU Explorer',
    appStatus: 'Beta',
  },
};
export default meta;
type Story = StoryObj<AppLogosComponent>;

export const Default: Story = {
  args: {
    variant: 'sidenav',
    brandmark: true,
  },
};
