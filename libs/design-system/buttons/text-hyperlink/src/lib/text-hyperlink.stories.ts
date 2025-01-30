import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<{ link: string }> = {
  title: 'Design System/Buttons/TextHyperlink',
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
    template: `<a href="${args.link}" target="_blank" rel="noopener noreferrer">${args.link}</a>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
