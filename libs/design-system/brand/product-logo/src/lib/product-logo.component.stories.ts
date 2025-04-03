import { Meta, StoryObj } from '@storybook/angular';
import { getProductLogoIds, ProductLogoComponent } from './product-logo.component';

const sortedIds = [...getProductLogoIds()].sort((a, b) => a.localeCompare(b));

const meta: Meta<ProductLogoComponent> = {
  component: ProductLogoComponent,
  title: 'Design System/Brand/Product Logo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1409-4',
    },
  },
  argTypes: {
    id: {
      control: 'select',
      options: sortedIds,
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
  },
  args: {
    id: sortedIds[0],
    size: 'small',
  },
};
export default meta;
type Story = StoryObj<ProductLogoComponent>;

export const Default: Story = {};
