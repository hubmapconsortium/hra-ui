import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  component: FooterComponent,
  title: 'Design System/Navigation/Footer',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=6126-21931&t=ivOFYpnSHUOD8EmK-1',
    },
    layout: 'fullscreen',
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<FooterComponent>;

export const Primary: Story = {
  args: {},
};
