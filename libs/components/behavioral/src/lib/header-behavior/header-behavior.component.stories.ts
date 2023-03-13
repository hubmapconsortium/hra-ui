import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { HeaderBehaviorComponent } from './header-behavior.component';

export default {
  title: 'HeaderBehaviorComponent',
  component: HeaderBehaviorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<HeaderBehaviorComponent>;

const Template: Story<HeaderBehaviorComponent> = (args: HeaderBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
