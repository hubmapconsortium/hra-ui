import { provideHttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { provideIcons } from '@hra-ui/cdk/icons';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'MaterialSymbols',
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideIcons({
          fontIcons: {
            defaultClasses: ['material-symbols-rounded'],
          },
        }),
      ],
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
