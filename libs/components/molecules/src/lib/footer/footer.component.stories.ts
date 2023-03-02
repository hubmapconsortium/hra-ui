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

// const ITEMS = [
//   { label: 'Download XLXS' },
//   { label: 'Download JSON-LD' },
//   { label: 'Download PDF' },
//   { label: 'Download AI' },
//   { label: 'Download PNG' },
// ];

const Template: Story<FooterComponent> = (args: FooterComponent) => ({
  props: args,
  styles: [
    `
    hra-footer {

        display: flex;
        align-items: center;
        height: 3rem;
        padding: 0 3rem 0 1rem;
        background-color: #f8f9fa;
        box-shadow: 0px 0rem 0.1rem #a09c9c;
        position: absolute;
        left: 0.5rem;
        bottom: 0.1rem;
        right: 0.5rem;

    }
  `,
  ],
});

export const Primary = Template.bind({});
Primary.args = {
  // items: ITEMS,
};
