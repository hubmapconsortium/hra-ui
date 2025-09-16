import { ConsentBannerComponent } from './consent-banner.component';
import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ConsentBannerComponent> = {
  component: ConsentBannerComponent,
  title: 'Design System/Consent Banner',
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};

export default meta;
type Story = StoryObj<ConsentBannerComponent>;

export const Primary: Story = {
  args: {},
};
