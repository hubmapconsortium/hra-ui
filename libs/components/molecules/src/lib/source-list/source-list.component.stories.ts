import { Meta, StoryFn } from '@storybook/angular';

import { SourceListComponent, SourceListItem } from './source-list.component';

export default {
  title: 'SourceListComponent',
  component: SourceListComponent,
} as Meta<SourceListComponent<SourceListItem>>;

const Template: StoryFn<SourceListComponent<SourceListItem>> = (args) => ({ props: args });

export const Default = {
  render: Template,

  args: {
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
  },
};
