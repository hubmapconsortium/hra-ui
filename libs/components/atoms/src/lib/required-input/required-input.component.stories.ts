import { StoryFn, Meta } from '@storybook/angular';
import { RequiredInputComponent } from './required-input.component';

export default {
  title: 'RequiredInputComponent',
  component: RequiredInputComponent,
} as Meta<RequiredInputComponent>;

const Template: StoryFn<RequiredInputComponent> = (args) => ({
  props: args,
  styles: [],
});

export const Primary = {
  render: Template,

  args: {
    label: 'Enter Name',
  },
};
