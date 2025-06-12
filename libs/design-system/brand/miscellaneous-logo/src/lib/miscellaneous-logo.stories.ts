import { IconComponent } from '@hra-ui/design-system/icons';
import { Meta, StoryObj } from '@storybook/angular';

const ICONS = ['biomarker', 'cell-type', 'contribute', 'data', 'experts', 'explore', 'publications', 'training'].map(
  (icon) => `misc:${icon}`,
);

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Design System/Brand/Miscellaneous Logo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2668-75',
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
