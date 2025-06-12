import { IconComponent } from '@hra-ui/design-system/icons';
import { Meta, StoryObj } from '@storybook/angular';

const ICONS = ['all-organs', 'blood', 'large-intestine', 'neurons', 'skin'].map((icon) => `organ:${icon}`);

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Design System/Brand/Organ Logo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1116-9161',
    },
  },
  argTypes: {
    svgIcon: {
      control: 'select',
      options: ICONS,
    },
  },
  args: {
    svgIcon: ICONS[0],
  },
};
export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {};
