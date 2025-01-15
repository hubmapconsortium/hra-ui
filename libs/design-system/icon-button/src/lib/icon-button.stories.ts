import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { IconButtonSizeDirective } from './icon-button-size/icon-button-size.directive';
import { IconButtonVariantDirective } from './icon-button-variant/icon-button-variant.directive';

const meta: Meta = {
  title: 'IconButton',
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
      options: ['light', 'dark', 'color'],
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [MatButtonModule, MatIconModule, IconButtonSizeDirective, IconButtonVariantDirective],
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
