import { IconComponent } from '@hra-ui/design-system/icons';
import { Meta, StoryObj } from '@storybook/angular';

const ICONS = ['graphs', 'ftu', 'collections', '3d-organ', 'omap'];

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Design System/Brand/Product Logo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1409-4',
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
