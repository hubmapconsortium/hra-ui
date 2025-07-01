import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
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

const Template: StoryFn<BiomarkerTableDataIconComponent> = (args: BiomarkerTableDataIconComponent) => ({
  props: args,
});

export const Primary = {
  render: Template,

  args: {
    color: 'grey',
    size: 2,
  },
};
