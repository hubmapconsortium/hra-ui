import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BiomarkerTableDataIconComponent } from './biomarker-table-data-icon.component';

export default {
  title: 'BiomarkerTableDataIconComponent',
  component: BiomarkerTableDataIconComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<BiomarkerTableDataIconComponent>;

const Template: Story<BiomarkerTableDataIconComponent> = (args: BiomarkerTableDataIconComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  meanValue: 0.0,
  gradientPoints: [
    { color: '#00385F', percentage: 0 },
    { color: '#63B1D3', percentage: 49.78 },
    { color: '#EDFAFD', percentage: 100 },
  ],
};
