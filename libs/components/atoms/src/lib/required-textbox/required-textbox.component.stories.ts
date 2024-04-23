import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { RequiredTextboxComponent } from './required-textbox.component';

export default {
  title: 'RequiredTextboxComponent',
  component: RequiredTextboxComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<RequiredTextboxComponent>;

const Template: StoryFn<RequiredTextboxComponent> = (args) => ({
  props: args,
});

export const Primary = {
  render: Template,

  args: {
    placeholder: 'Enter Message',
    label: 'Message',
  },
};
