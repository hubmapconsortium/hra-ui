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
};
