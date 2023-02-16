import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LandingPageInDepthComponent } from './landing-page-in-depth.component';

export default {
  title: 'LandingPageInDepthComponent',
  component: LandingPageInDepthComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<LandingPageInDepthComponent>;

const Template: Story<LandingPageInDepthComponent> = (args: LandingPageInDepthComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
