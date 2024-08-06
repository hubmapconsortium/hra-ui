import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideDesignSystem } from './providers';

const meta: Meta = {
  title: 'MatIconButton',
  args: {
    icon: 'search',
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
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [MatButtonModule, MatIconModule],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <button mat-icon-button>
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
