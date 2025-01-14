import { provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideIcons } from '@hra-ui/cdk/icons';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { IconButtonSizeDirective } from './icon-button-size/icon-button-size.directive';
import { IconButtonVariantDirective } from './icon-button-variant/icon-button-variant.directive';
import { provideIconButtons } from './providers';

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
    color: 'black',
  },
  argTypes: {
    icon: {
      type: 'string',
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    color: {
      control: 'select',
      options: ['white', 'red', 'black'],
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideIcons({
          fontIcons: {
            defaultClasses: ['material-symbols-rounded'],
          },
        }),
        provideIconButtons(),
      ],
    }),
    moduleMetadata({
      imports: [MatButtonModule, MatIconModule, IconButtonSizeDirective, IconButtonVariantDirective],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <button mat-icon-button hraIconButtonSize="${args['size']}" hraIconButtonVariant="${args['color']}">
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

export const Social: Story = {
  args: {
    size: 'large',
    icon: 'social:github',
    color: 'black',
    link: 'https://github.com/hubmapconsortium/hra-ui',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: [
        'social:github',
        'social:facebook',
        'social:instagram',
        'social:linkedin',
        'social:youtube',
        'social:x',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    color: {
      control: 'select',
      options: ['white', 'red', 'black'],
    },
    link: {
      type: 'string',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <button mat-icon-button hraIconButtonSize="${args['size']}" hraIconButtonVariant="${args['color']}">
        <mat-icon [svgIcon]="'${args['icon']}'"></mat-icon>
      </button>
    `,
  }),
};
