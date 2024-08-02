import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { BrandLogoComponent } from './brand-logo.component';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<BrandLogoComponent> = {
  component: BrandLogoComponent,
  title: 'BrandLogoComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=84-802',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
};

export default meta;
type Story = StoryObj<BrandLogoComponent>;

function renderWithColor(color: string): Story['render'] {
  return (args) => ({
    props: args,
    styles: [
      `hra-brand-logo {
        --hra-brand-logo-text-color: ${color};
      }`,
    ],
  });
}

export const Primary: Story = {
  args: {},
};

export const PrimaryWhite: Story = {
  render: renderWithColor('#ffffff'),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Small: Story = {
  args: {
    small: true,
  },
};

export const SmallWhite: Story = {
  args: {
    small: true,
  },
  render: renderWithColor('#ffffff'),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
