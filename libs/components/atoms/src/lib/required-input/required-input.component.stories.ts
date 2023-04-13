import { Story, Meta } from '@storybook/angular';
import { RequiredInputComponent } from './required-input.component';

export default {
  title: 'RequiredInputComponent',
  component: RequiredInputComponent,
} as Meta<RequiredInputComponent>;

const Template: Story<RequiredInputComponent> = (args: RequiredInputComponent) => ({
  props: args,
  styles: [],
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Enter Name',
};
