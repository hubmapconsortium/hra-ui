import { provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideIcons } from '@hra-ui/cdk/icons';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { IconButtonSizeDirective } from './icon-button-size/icon-button-size.directive';
import { provideIconButtons } from './providers';

const meta: Meta = {
  title: 'IconButton',
  args: {
    icon: 'search',
    size: 'large',
  },
  argTypes: {
    icon: {
      type: 'string',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
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
      imports: [MatButtonModule, MatIconModule, IconButtonSizeDirective],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <button mat-icon-button hraIconButtonSize="${args['size']}">
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

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};
