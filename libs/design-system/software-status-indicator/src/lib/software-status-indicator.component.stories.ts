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
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=5444-20834&t=OL1ruNgysgpR28y0-4',
    },
  },
};
export default meta;
type Story = StoryObj<SoftwareStatusIndicatorComponent>;

export const Default: Story = {
  args: {},
};
