import { moduleMetadata, Story, Meta } from '@storybook/angular';
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

const Template: Story<EmailInputComponent> = (args: EmailInputComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
