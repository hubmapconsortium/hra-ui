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
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <button mat-button disableRipple hraButtonSize="${args['size']}">Button</button>
    `,
  }),
};

export const BasicSecondary: Story = {
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <button mat-button disableRipple hraSecondaryButton hraButtonSize="${args['size']}">Button</button>
    `,
  }),
};

export const FlatPrimary: Story = {
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <button mat-flat-button disableRipple
    hraPrimaryButton hraButtonSize="${args['size']}">Button</button>
    `,
  }),
};

export const FlatSecondary: Story = {
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <button mat-flat-button disableRipple hraSecondaryButton
    hraButtonSize="${args['size']}">Button</button>
    `,
  }),
};

export const CtaFlatPrimary: Story = {
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <button mat-flat-button disableRipple hraCallToActionButton hraPrimaryButton
    hraButtonSize="${args['size']}">Button
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
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <button mat-flat-button disableRipple hraCallToActionButton hraSecondaryButton
    hraButtonSize="${args['size']}">Button
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
      <mat-button-toggle value="bold" disableRipple [disabled]=disabled
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
      <mat-button-toggle value="bold" disableRipple hraNavCatButton>
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

export const NavigationItemButton: Story = {
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <button mat-button disableRipple hraNavItemButton
      hraButtonSize="${args['size']}">
        <span class="label">
          Button
        </span>
      </button>
    `,
  }),
};
