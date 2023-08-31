import { Meta, Story } from '@storybook/angular';

import { SourceListComponent } from './source-list.component';

export default {
  title: 'SourceListComponent',
  component: SourceListComponent,
} as Meta<SourceListComponent>;

const Template: Story<SourceListComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
Default.args = {
  sources: [
    {
      title: 'Kidney Precision Medicine Project',
      label: 'Ancillary Study Data, Clinical Data, HRT Codebook',
      link: 'google.com',
    },
    {
      title: '[Dataset Owner Title]',
      label: '<Dataset Title + Link to Dataset>',
      link: 'google.com',
    },
    {
      title: '[Dataset Owner Title]',
      label: '<Dataset Title + Link to Dataset>',
      link: 'google.com',
    },
    {
      title:
        '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
      label:
        '<Extremely long dataset title that wraps around to the next line as you can see in this example + link to dataset>',
      link: 'google.com',
    },
  ],
};
