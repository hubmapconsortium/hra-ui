import { LinkRegistryState } from '@hra-ui/cdk/state';
import { Meta, StoryFn } from '@storybook/angular';
import { ScreenSizeNoticeComponent } from './screen-size-notice.component';

export default {
  title: 'ScreenSizeNoticeComponent',
  component: ScreenSizeNoticeComponent,
  parameters: {
    state: {
      states: [LinkRegistryState],
      actions: [],
    },
  },
} as Meta<ScreenSizeNoticeComponent>;

const Template: StoryFn<ScreenSizeNoticeComponent> = (args) => ({
  props: args,
  styles: [
    `
      hra-screen-size-notice {
        display: flex;
      }
    `,
  ],
});

export const Primary = {
  render: Template,

  args: {
    content: 'Test test test',
  },
};
