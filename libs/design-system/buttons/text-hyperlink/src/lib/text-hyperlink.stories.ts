import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TextHyperlinkDirective } from './text-hyperlink.directive';

const meta: Meta<{ link: string }> = {
  title: 'Design System/Buttons/Text Hyperlink',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1920-22',
    },
  },
  args: {
    link: 'https://google.com',
  },
  render: (args) => ({
    props: args,
    template: `<a hraHyperlink href="${args.link}" target="_blank" rel="noopener noreferrer">${args.link}</a>`,
  }),
  decorators: [
    moduleMetadata({
      imports: [TextHyperlinkDirective],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
