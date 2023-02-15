import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { MetricsComponent } from './metrics.component';

export default {
  title: 'MetricsComponent',
  component: MetricsComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<MetricsComponent>;

const Template: Story<MetricsComponent> = (args: MetricsComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
