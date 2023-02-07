import { Meta, Story } from '@storybook/angular/types-6-0';

import { PageHeaderComponent } from './page-header.component';
import { PageHeaderModule } from './page-header.module';


export default {
  title: 'Organism/Header',
  component: PageHeaderComponent,
  parameters: {
    module: PageHeaderModule
  }
} as Meta<PageHeaderComponent>;

const Template: Story<PageHeaderComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
Default.args = {};
