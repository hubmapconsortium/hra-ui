import { FontStylesComponent } from './font-styles.component';

import type { Meta, StoryObj } from '@storybook/angular';
const meta: Meta<FontStylesComponent> = {
  component: FontStylesComponent,
  title: 'FontStylesComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=192-39',
    },
  },
  argTypes: {
    typographyType: {
      control: 'select',
      options: ['display', 'headline', 'title', 'label', 'body', 'wordmark'],
    },
  },
  args: {
    typographyType: 'display',
  },
};
export default meta;
type Story = StoryObj<FontStylesComponent>;

export const Primary: Story = {
  args: {},
};
