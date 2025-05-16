import { Meta, StoryObj } from '@storybook/angular';
import { TextHyperlinkComponent } from './text-hyperlink.component';

const meta: Meta<TextHyperlinkComponent> = {
  title: 'Design System/Buttons/Text Hyperlink',
  component: TextHyperlinkComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1920-22',
    },
  },
  args: {
    text: 'Link Text',
    url: 'https://google.com',
  },
};
export default meta;
type Story = StoryObj<TextHyperlinkComponent>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: 'arrow_right_alt',
  },
};
