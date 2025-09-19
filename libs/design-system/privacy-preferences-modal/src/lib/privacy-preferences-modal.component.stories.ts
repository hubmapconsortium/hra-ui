import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { PrivacyPreferencesModalComponent } from './privacy-preferences-modal.component';

const meta: Meta = {
  component: PrivacyPreferencesModalComponent,
  title: 'PrivacyPreferencesModalComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4497-850&p=f',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<PrivacyPreferencesModalComponent>;

export const Primary: Story = {};
