import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TitleCardComponent } from './title-card.component';

export default {
  title: 'Molecule/TitleCardComponent',
  component: TitleCardComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<TitleCardComponent>;

const Template: Story<TitleCardComponent> = (args: TitleCardComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
