import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { HeaderComponent } from './header.component';

export default {
  title: 'HeaderComponent',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<HeaderComponent>;

const Template: StoryFn<HeaderComponent> = (args) => ({
  props: args,
});

export const Primary = {
  render: Template,

  args: {
    productLogoUrl: 'assets/icons/logo-icon.svg',
    productTitle: 'Human Reference Atlas',
    appTitle: 'Functional Tissue Unit Explorer',
  },
};
