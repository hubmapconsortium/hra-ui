import { LinkRegistryState } from '@hra-ui/cdk/state';
import { Meta, Story } from '@storybook/angular';
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

const Template: Story<ScreenSizeNoticeComponent> = (args: ScreenSizeNoticeComponent) => ({
  props: args,
  styles: [
    `
      hra-screen-size-notice {
        display: flex;
      }
    `,
  ],
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'Test test test',
};
