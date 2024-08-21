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
  render: () => ({
    template: `
    <a mat-button disableRipple href="https://humanatlas.io" target="_blank">Button
    </a>
    `,
  }),
};

export const BasicSecondary: Story = {
  render: () => ({
    template: `
    <a mat-button disableRipple hraSecondaryButton href="https://humanatlas.io" target="_blank">Button
    </a>
    `,
  }),
};

export const FlatPrimary: Story = {
  render: () => ({
    template: `
    <a mat-flat-button disableRipple hraPrimaryButton href="https://humanatlas.io" target="_blank">Button
    </a>
    `,
  }),
};

export const FlatSecondary: Story = {
  render: () => ({
    template: `
    <a mat-flat-button disableRipple hraSecondaryButton href="https://humanatlas.io" target="_blank">Button
    </a>
    `,
  }),
};

export const CtaFlatPrimary: Story = {
  render: () => ({
    template: `
    <a mat-flat-button disableRipple hraCallToActionButton hraPrimaryButton
    href="https://humanatlas.io" target="_blank">Button
    <mat-icon class="material-symbols-outlined" iconPositionEnd>arrow_forward</mat-icon>
    </a>
    `,
    styles: [
      `mat-icon {
        margin-left: 0.25rem;
      }`,
    ],
  }),
};

export const CtaFlatSecondary: Story = {
  render: () => ({
    template: `
    <button mat-flat-button disableRipple hraCallToActionButton hraSecondaryButton
    href="https://humanatlas.io" target="_blank">Button
    <mat-icon class="material-symbols-outlined" iconPositionEnd>arrow_forward</mat-icon>
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
  render: (args) => ({
    props: args,
    template: `
      <mat-button-toggle value="bold" disableRipple [disabled]=disabled>
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
