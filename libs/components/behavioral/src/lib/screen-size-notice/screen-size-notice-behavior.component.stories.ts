import { ScreenSizeNoticeBehaviorComponent } from './screen-size-notice-behavior.component';
import { StorageActions, StorageState } from '@hra-ui/cdk/state';
import { Meta, Story } from '@storybook/angular';

export default {
  title: 'ScreenSizeNoticeBehaviorComponent',
  component: ScreenSizeNoticeBehaviorComponent,
  parameters: {
    state: {
      states: [StorageState],
    },
  },
} as Meta<ScreenSizeNoticeBehaviorComponent>;

const Template: Story<ScreenSizeNoticeBehaviorComponent> = (args: ScreenSizeNoticeBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
