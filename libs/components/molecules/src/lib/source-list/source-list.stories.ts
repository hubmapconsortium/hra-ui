import { Meta, Story } from '@storybook/angular/types-6-0';

import { SourceListComponent } from './source-list.component';

export default {
  title: 'Molecule/SourceListComponent',
  component: SourceListComponent,
} as Meta<SourceListComponent>;

const Template: Story<SourceListComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
Default.args = {
  sources: [
    {
      title: 'Owner Title',
      link: 'google.com',
    },
    {
      title:
        '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
      link: 'google.com',
    },
  ],
};
