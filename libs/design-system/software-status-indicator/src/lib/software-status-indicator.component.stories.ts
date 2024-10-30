import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { SoftwareStatusIndicatorComponent } from './software-status-indicator.component';

const meta: Meta<SoftwareStatusIndicatorComponent> = {
  component: SoftwareStatusIndicatorComponent,
  title: 'SoftwareStatusIndicatorComponent',
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1409-13182',
    },
  },
  args: {
    status: 'Beta',
    size: 'medium',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['Beta', 'Alpha', 'Preview'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};
export default meta;
type Story = StoryObj<SoftwareStatusIndicatorComponent>;

export const Default: Story = {};
