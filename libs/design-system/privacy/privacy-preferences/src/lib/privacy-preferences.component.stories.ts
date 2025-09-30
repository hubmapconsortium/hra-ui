import { type Meta, type StoryObj } from '@storybook/angular';

import { PrivacyPreferencesComponent } from './privacy-preferences.component';

const meta: Meta<PrivacyPreferencesComponent> = {
  component: PrivacyPreferencesComponent,
  title: 'Design System/Privacy Preferences',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4497-850&p=f',
    },
  },
};
export default meta;
type Story = StoryObj<PrivacyPreferencesComponent>;

export const Primary: Story = {};
