import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ContactModalComponent } from './contact-modal.component';

export default {
  title: 'ContactModalComponent',
  component: ContactModalComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<ContactModalComponent>;

const Template: Story<ContactModalComponent> = (args: ContactModalComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  productLogoUrl: 'assets/icons/logo-icon.svg',
  productTitle: 'Human Reference Atlas',
  description: 'Please allow two business days for a response to each inquiry.',
};
