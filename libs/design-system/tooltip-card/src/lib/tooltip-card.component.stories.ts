import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipContent, TooltipCardComponent } from './tooltip-card.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TooltipCardComponent> = {
  component: TooltipCardComponent,
  title: 'TooltipCardComponent',
  argTypes: {
    content: {
      type: {
        name: 'array',
        value: {
          name: 'object',
          value: {
            title: { name: 'string' },
            description: { name: 'string', required: true },
          },
        },
        required: true,
      },
    },
    small: {
      type: 'boolean',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=52-100',
    },
  },
};
export default meta;
type Story = StoryObj<TooltipCardComponent>;

const title = 'Section Title';
const descriptionShort =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const descriptionLong =
  descriptionShort +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const tooltip: TooltipContent = {
  title,
  description: descriptionShort,
};
const descriptionOnlyTooltip: TooltipContent = {
  description: descriptionLong,
};

export const Default: Story = {
  args: {
    content: [tooltip, tooltip],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText(title).length).toEqual(2);
    await expect(canvas.getAllByText(descriptionShort).length).toEqual(2);
  },
};

export const DescriptionOnly: Story = {
  args: {
    content: [descriptionOnlyTooltip],
  },
};

export const Small: Story = {
  args: {
    content: [tooltip, tooltip],
    small: true,
  },
};

export const SmallDescriptionOnly: Story = {
  args: {
    content: [descriptionOnlyTooltip],
    small: true,
  },
};
