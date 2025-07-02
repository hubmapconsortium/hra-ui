import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
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

const Template: StoryFn<ContactModalComponent> = (args) => ({
  props: args,
});

export const Primary = {
  render: Template,

  args: {
    productLogoUrl: 'assets/icons/logo-icon.svg',
    productTitle: 'Human Reference Atlas',
  },
};
