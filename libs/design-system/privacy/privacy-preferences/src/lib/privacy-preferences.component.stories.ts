import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventCategory } from '@hra-ui/common/analytics/events';

import { PrivacyPreferencesComponent, type PrivacyPreferencesData } from './privacy-preferences.component';

const meta: Meta<PrivacyPreferencesComponent> = {
  component: PrivacyPreferencesComponent,
  title: 'Design System/Privacy Preferences',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4497-850&p=f',
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            categories: {
              [EventCategory.Necessary]: true,
              [EventCategory.Statistics]: false,
              [EventCategory.Preferences]: false,
              [EventCategory.Marketing]: false,
            },
            tab: 'consent',
          } satisfies PrivacyPreferencesData,
        },
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<PrivacyPreferencesComponent>;

export const Primary: Story = {};
