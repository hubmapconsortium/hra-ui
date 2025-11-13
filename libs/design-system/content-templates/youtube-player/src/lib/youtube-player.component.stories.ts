import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { ConsentService } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';

import { HraYoutubePlayerComponent } from './youtube-player.component';

const meta: Meta<HraYoutubePlayerComponent> = {
  component: HraYoutubePlayerComponent,
  title: 'Design System/Content Templates/Youtube Player',
  args: {
    videoId: 'pzUFmDhQEO8',
  },
  argTypes: {
    videoId: {
      control: 'text',
      description: 'The YouTube video ID',
    },
  },
};

export default meta;
type Story = StoryObj<HraYoutubePlayerComponent>;

export const Default: Story = {};

export const WithCookiesEnabled: Story = {
  name: 'With Marketing Cookies Enabled',
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: ConsentService,
          useValue: {
            isCategoryEnabled: (category: EventCategory) => category === EventCategory.Marketing,
            categories: () => ({ [EventCategory.Marketing]: true }),
          },
        },
      ],
    }),
  ],
};
