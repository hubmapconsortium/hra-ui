import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TextButtonDirective } from './text-button.directive';

interface TextButtonArgs {
  text: string;
}

const meta: Meta<TextButtonArgs> = {
  title: 'Design System/Buttons/Text Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1920-22',
    },
  },
  args: {
    text: 'Button Text',
  },
  decorators: [
    moduleMetadata({
      imports: [TextButtonDirective],
    }),
  ],
  render: (args) => ({
    template: `
      <button hraTextButton>
        {{ text }}
      </button>
    `,
    props: args,
  }),
};
export default meta;
type Story = StoryObj<TextButtonArgs>;

export const Default: Story = {};
