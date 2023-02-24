import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { InfoModalComponent } from './info-modal.component';

export default {
  title: 'Molecule/InfoModalComponent',
  component: InfoModalComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<InfoModalComponent>;

const Template: Story<InfoModalComponent> = (args: InfoModalComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  text: 'Human Reference Atlas',
  productLogoUrl: 'assets/icons/logo-icon.svg',
  description: `We received your message. Please allow two business days for a <br>
                  response to each inquiry. Thanks for your time and expertise!`,
};
