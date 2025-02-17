import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  component: FooterComponent,
  title: 'Design System/Navigation/Footer',
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
