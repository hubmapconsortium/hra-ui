import { provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '../../../src';
import { CallToActionButtonDirective } from './directives/call-to-action-button.directive';
import { PrimaryButtonDirective } from './directives/primary-button.directive';
import { SecondaryButtonDirective } from './directives/secondary-button.directive';

import { provideButtons } from './providers';
const meta: Meta = {
  title: 'ButtonComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=82-776',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), provideDesignSystem(), provideButtons()],
    }),
    moduleMetadata({
      imports: [MatButtonModule, CallToActionButtonDirective, PrimaryButtonDirective, SecondaryButtonDirective],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const BasicPrimary: Story = {
  render: () => ({
    template: `
    <button mat-button disableRipple>Button
    </button>
    `,
  }),
};

export const BasicSecondary: Story = {
  render: () => ({
    template: `
    <button mat-button disableRipple hraSecondaryButton>Button
    </button>
    `,
  }),
};

export const FlatPrimary: Story = {
  render: () => ({
    template: `
    <button mat-flat-button disableRipple hraPrimaryButton>Button
    </button>
    `,
  }),
};

export const FlatSecondary: Story = {
  render: () => ({
    template: `
    <button mat-flat-button disableRipple hraSecondaryButton>Button
    </button>
    `,
  }),
};

export const CtaFlatPrimary: Story = {
  render: () => ({
    template: `
    <button mat-flat-button disableRipple hraCallToActionButton hraPrimaryButton>Button
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

export const CtaFlatSecondary: Story = {
  render: () => ({
    template: `
    <button mat-flat-button disableRipple hraCallToActionButton hraSecondaryButton>Button
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
