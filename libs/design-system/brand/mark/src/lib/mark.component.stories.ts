import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { provideBrandMarks } from './brand-marks';
import { BrandMarkComponent } from './mark.component';

const meta: Meta<BrandMarkComponent> = {
  component: BrandMarkComponent,
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
      options: ['default', 'contrast', 'small'],
    },
  },
  args: {
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<BrandMarkComponent>;

export const Default: Story = {};
export const CNS: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        provideBrandMarks([
          { variant: 'default', src: 'assets/brand/mark/cns-small.svg', width: 40, height: 40 },
          { variant: 'contrast', src: 'assets/brand/mark/cns-small.svg', width: 40, height: 40 },
          { variant: 'small', src: 'assets/brand/mark/cns-small.svg', width: 40, height: 40 },
        ]),
      ],
    }),
  ],
};
