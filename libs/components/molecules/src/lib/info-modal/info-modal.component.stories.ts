import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { InfoModalComponent } from './info-modal.component';

export default {
  title: 'InfoModalComponent',
  component: InfoModalComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<InfoModalComponent>;

const Template: StoryFn<InfoModalComponent> = (args) => ({
  props: args,
});

export const Primary = {
  render: Template,

  args: {
    productTitle: 'Human Reference Atlas',
    productLogoUrl: 'assets/icons/logo-icon.svg',
    description: `We received your message. Please allow two business days for a <br>
                    response to each inquiry. Thanks for your time and expertise!`,
  },
};
