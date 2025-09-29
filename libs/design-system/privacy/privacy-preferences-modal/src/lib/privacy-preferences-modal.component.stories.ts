import { type Meta, type StoryObj } from '@storybook/angular';

import { PrivacyPreferencesModalComponent } from './privacy-preferences-modal.component';

const meta: Meta<PrivacyPreferencesModalComponent> = {
  component: PrivacyPreferencesModalComponent,
  title: 'Design System/Privacy Preferences Modal',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4497-850&p=f',
    },
  },
};
export default meta;
type Story = StoryObj<PrivacyPreferencesModalComponent>;

export const Primary: Story = {};
