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
  color: '#FFFFFF',
  size: 1,
};
