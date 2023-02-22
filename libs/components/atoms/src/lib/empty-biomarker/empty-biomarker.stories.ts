import { Meta, Story } from '@storybook/angular/types-6-0';
import { EmptyBiomarkerComponent } from './empty-biomarker.component';

export default {
  title: 'Atom/EmptyBiomarker',
  component: EmptyBiomarkerComponent,
} as Meta<EmptyBiomarkerComponent>;

const Template: Story<EmptyBiomarkerComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
Default.args = {};
