import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ScreenSizeNoticeComponent } from './screen-size-notice.component';

export default {
  title: 'ScreenSizeNoticeComponent',
  component: ScreenSizeNoticeComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<ScreenSizeNoticeComponent>;

const Template: Story<ScreenSizeNoticeComponent> = (args: ScreenSizeNoticeComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
