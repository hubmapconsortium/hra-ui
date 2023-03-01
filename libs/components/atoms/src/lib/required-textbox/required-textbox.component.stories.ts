import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { RequiredTextboxComponent } from './required-textbox.component';

export default {
  title: 'Atoms/RequiredTextboxComponent',
  component: RequiredTextboxComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<RequiredTextboxComponent>;

const Template: Story<RequiredTextboxComponent> = (args: RequiredTextboxComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Enter Message',
};
