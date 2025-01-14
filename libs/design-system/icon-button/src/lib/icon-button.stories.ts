import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { IconButtonSizeDirective } from './icon-button-size/icon-button-size.directive';
import { IconButtonVariantDirective } from './icon-button-variant/icon-button-variant.directive';

/** All CNS links */
export const SOCIAL_LINKS: Record<string, string> = {
  x: 'https://twitter.com/cnscenter',
  facebook: 'https://www.facebook.com/cnscenter/',
  instagram: 'https://www.instagram.com/cns_at_iu/',
  youtube: 'https://www.youtube.com/@CNSCenter/',
  linkedin: 'https://www.linkedin.com/company/cns-indiana-university-bloomington',
  email: 'mailto:infoccf@iu.edu',
  github: 'https://github.com/hubmapconsortium/hra-ui',
};

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
      providers: [provideDesignSystem()],
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
    icon: 'github',
    color: 'black',
    link: 'https://github.com/hubmapconsortium/hra-ui',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ['email', 'github', 'facebook', 'instagram', 'linkedin', 'youtube', 'x'],
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
        <a href="${SOCIAL_LINKS[args['icon']]}" target="_blank" rel="noopener noreferrer">
          @if ('${args['icon']}' === 'email') {
            <mat-icon [class.small]="${args['size']} === 'small'">email</mat-icon>
          } @else {
            <mat-icon [class.small]="${args['size']} === 'small'" svgIcon="social:${args['icon']}"></mat-icon>
          }
        </a>
      </button>
    `,
  }),
};
