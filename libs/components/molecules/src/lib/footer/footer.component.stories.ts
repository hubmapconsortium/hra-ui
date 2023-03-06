import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FooterComponent } from './footer.component';

export default {
  title: 'FooterComponent',
  component: FooterComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<FooterComponent>;

const Template: Story<FooterComponent> = (args: FooterComponent) => ({
  props: args,
  styles: [
    `
    hra-footer {
        position: absolute;
        inset: auto 0 0 0;
    }
  `,
  ],
});

export const Primary = Template.bind({});
Primary.args = {};
