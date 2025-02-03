import { Meta, StoryObj } from '@storybook/angular';

import { BrandmarkComponent } from './mark.component';

const meta: Meta<BrandmarkComponent> = {
  component: BrandmarkComponent,
  title: 'Design System/Brand/Mark',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=82-776',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'contrast'],
    },
  },
  args: {
    variant: 'default',
  },
};
export default meta;
type Story = StoryObj<BrandmarkComponent>;

export const Default: Story = {};
