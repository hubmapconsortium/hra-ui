import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '../../../src';
import { ButtonModule } from './button.module';

const meta: Meta = {
  title: 'ButtonComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=5-842',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [ButtonModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const BasicPrimary: Story = {
  args: {
    size: 'medium',
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <button mat-button [disabled]="${args['disabled']}" hraButtonSize="${args['size']}">Button</button>
    `,
  }),
};

export const BasicSecondary: Story = {
  args: {
    size: 'medium',
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <button mat-button [disabled]="${args['disabled']}" hraSecondaryButton hraButtonSize="${args['size']}">Button</button>
    `,
  }),
};

export const BasicIcon: Story = {
  args: {
    disabled: false,
    iconName: 'download',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    iconName: {
      control: 'select',
      options: ['upload'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <button mat-button [disabled]="${args['disabled']}" hraButtonSize="large">Button
      <mat-icon class="material-symbols-rounded">${args['iconName']}</mat-icon>
      </button>
    `,
  }),
};

export const FlatRound: Story = {
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <button mat-flat-button
    hraPrimaryButton hraButtonSize="large" [disabled]="${args['disabled']}">Button</button>
    `,
  }),
};

export const CtaFlatPrimary: Story = {
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <button mat-flat-button  hraCallToActionButton hraPrimaryButton
    hraButtonSize="large" [disabled]="${args['disabled']}">Button
      <mat-icon class="material-symbols-rounded" iconPositionEnd>arrow_right_alt</mat-icon>
    </button>
    `,
    styles: [
      `mat-icon {
        margin-left: 0.25rem;
      }`,
    ],
  }),
};

export const CtaFlatSecondary: Story = {
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <button mat-flat-button hraCallToActionButton hraSecondaryButton
    hraButtonSize="large" [disabled]="${args['disabled']}">Button
      <mat-icon class="material-symbols-rounded" iconPositionEnd>arrow_right_alt</mat-icon>
    </button>
    `,
    styles: [
      `mat-icon {
        margin-left: 0.25rem;
      }`,
    ],
  }),
};

export const ToggleButton: Story = {
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <mat-button-toggle value="bold" [disabled]=disabled
      hraButtonSize="${args['size']}">
        Button
      </mat-button-toggle>
    `,
    styles: [
      `mat-icon {
        margin-right: 0.25rem;
      }`,
    ],
  }),
  args: {
    disabled: false,
    size: 'large',
  },
};

export const NavigationCategoryButton: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mat-button-toggle value="bold" hraNavCatButton>
        <span class="label">Button</span>
      </mat-button-toggle>
    `,
    styles: [
      `mat-icon {
        margin-right: 0.25rem;
      }`,
    ],
  }),
};
