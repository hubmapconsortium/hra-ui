import { Story, Meta } from '@storybook/angular';
import { GradientLegendComponent } from './gradient-legend.component';

export default {
  title: 'GradientLegendComponent',
  component: GradientLegendComponent,
} as Meta<GradientLegendComponent>;

const Template: Story<GradientLegendComponent> = (args: GradientLegendComponent) => ({
  props: args,
  styles: ['hra-gradient-legend { width: 400px; }'],
});

export const Primary = Template.bind({});
Primary.args = {
  gradient: [
    { color: '#00385F', percentage: 0 },
    { color: '#63B1D3', percentage: 49.78 },
    { color: '#EDFAFD', percentage: 100 },
  ],
};
