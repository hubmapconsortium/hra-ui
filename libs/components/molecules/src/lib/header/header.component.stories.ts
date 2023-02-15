import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { HeaderComponent } from './header.component';

export default {
  title: 'Molecule/HeaderComponent',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<HeaderComponent>;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  logo: '/assets/icons/logo-icon.svg',
  info: '/assets/icons/info.svg',
};
