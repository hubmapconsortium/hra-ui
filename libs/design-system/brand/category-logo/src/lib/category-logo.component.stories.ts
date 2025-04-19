import { Meta, StoryObj } from '@storybook/angular';
import { getCategoryLogoIds, CategoryLogoComponent } from './category-logo.component';

const sortedIds = [...getCategoryLogoIds()].sort((a, b) => a.localeCompare(b));

const meta: Meta<CategoryLogoComponent> = {
  component: CategoryLogoComponent,
  title: 'Design System/Brand/Category Logo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2668-75',
    },
  },
  argTypes: {
    id: {
      control: 'select',
      options: sortedIds,
    },
  },
  args: {
    id: sortedIds[0],
  },
};
export default meta;
type Story = StoryObj<CategoryLogoComponent>;

export const Default: Story = {};
