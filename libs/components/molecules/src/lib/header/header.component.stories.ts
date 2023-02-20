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
  productLogoUrl: 'assets/icons/logo-icon.svg',
  productTitle: 'Human Reference Atlas',
  appTitle: 'Functional Tissue Unit Explorer',
};
