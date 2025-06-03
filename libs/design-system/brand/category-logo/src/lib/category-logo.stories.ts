import { IconComponent } from '@hra-ui/design-system/icons';
import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Design System/Brand/Category Logo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2668-75',
    },
  },
  argTypes: {
    svgIcon: {
      control: 'select',
      options: [],
      mapping: {},
    },
  },
  args: {
    svgIcon: 'category:data',
  },
};
export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {};
