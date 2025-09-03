import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { IconButtonModule } from './icon-button.module';

const meta: Meta = {
  title: 'Design System/Buttons/Icon Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=24-876',
    },
  },
  args: {
    icon: 'search',
    size: 'large',
    variant: 'dark',
  },
  argTypes: {
    icon: {
      type: 'string',
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    variant: {
      control: 'select',
      options: ['dark', 'light', 'color'],
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [IconButtonModule],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <button mat-icon-button hraIconButtonSize="${args['size']}" hraIconButtonVariant="${args['variant']}">
        <mat-icon>${args['icon']}</mat-icon>
      </button>
    `,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
  },
};

export const Light: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    variant: 'light',
  },
};

export const Color: Story = {
  args: {
    variant: 'color',
  },
};
