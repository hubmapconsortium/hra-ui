import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { GradientLegendComponent } from './gradient-legend.component';

export default {
  title: 'GradientLegendComponent',
  component: GradientLegendComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<GradientLegendComponent>;

const Template: Story<GradientLegendComponent> = (args: GradientLegendComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
