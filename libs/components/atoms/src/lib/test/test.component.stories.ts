import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TestComponent } from './test.component';

export default {
  title: 'TestComponent',
  component: TestComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<TestComponent>;

const Template: Story<TestComponent> = (args: TestComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
