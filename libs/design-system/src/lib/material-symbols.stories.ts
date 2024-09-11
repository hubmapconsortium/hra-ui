import { MatIconModule } from '@angular/material/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { provideDesignSystem } from './providers';

const meta: Meta = {
  title: 'MaterialSymbols',
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const BuiltinSymbols: Story = {
  args: {
    name: 'search',
  },
  argTypes: {
    name: {
      type: 'string',
      description: 'Icon name',
    },
  },
  render: (args) => ({
    props: args,
    template: `<mat-icon>${args['name']}</mat-icon>`,
  }),
};

export const CustomSymbols: Story = {
  args: {
    name: 'social:email',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'upload',
        'settings_alert',
        'social:email',
        'social:email_large',
        'social:facebook',
        'social:facebook_large',
        'social:instagram',
        'social:instagram_large',
        'social:linkedin',
        'social:linkedin_large',
        'social:x',
        'social:x_large',
        'social:youtube',
        'social:youtube_large',
      ],
    },
  },
  render: (args) => ({
    props: args,
    template: `<mat-icon svgIcon=${args['name']}></mat-icon>`,
  }),
};

export const OrganIcons: Story = {
  args: {
    name: 'organ:blood',
    color: 'blue',
    size: 4,
  },
  argTypes: {
    name: {
      control: 'select',
      options: ['organ:bladder', 'organ:blood'],
    },
    color: {
      control: 'select',
      options: ['red', 'blue', 'green'],
    },
    size: {
      control: 'select',
      options: [2, 4, 6],
    },
  },
  render: (args) => ({
    props: args,
    template: `<mat-icon svgIcon=${args['name']}></mat-icon>`,
    styles: [
      `mat-icon {
        --mat-icon-color: ${args['color']};
        height: ${args['size']}rem;
        width: ${args['size']}rem;
      }`,
    ],
  }),
};
