import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { EmailInputComponent } from './email-input.component';

export default {
  title: 'EmailInputComponent',
  component: EmailInputComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<EmailInputComponent>;

const Template: StoryFn<EmailInputComponent> = (args) => ({
  props: args,
});

export const Primary = {
  render: Template,

  args: {
    placeholder: 'ecmaier@iu.edu',
  },
};
