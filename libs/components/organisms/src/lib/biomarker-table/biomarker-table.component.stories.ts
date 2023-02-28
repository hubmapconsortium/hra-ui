import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BiomarkerTableComponent } from './biomarker-table.component';

export default {
  title: 'BiomarkerTableComponent',
  component: BiomarkerTableComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<BiomarkerTableComponent>;

const Template: Story<BiomarkerTableComponent> = (args: BiomarkerTableComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
