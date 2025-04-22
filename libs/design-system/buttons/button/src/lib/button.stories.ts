import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ProgressSpinnerComponent } from '../../../../indicators/progress-spinner/src/lib/progress-spinner.component';
import { CtaButtonDirective } from './directives/cta.directive';
import { ButtonSize, ButtonSizeDirective } from './directives/size.directive';
import { ButtonVariant, ButtonVariantDirective } from './directives/variant.directive';

interface CommonButtonArgs {
  disabled: boolean;
  loading: boolean;
}

interface WithVariant {
  variant: ButtonVariant;
}

interface WithSize {
  size: ButtonSize;
}

const VARIANT_ARG_TYPES: ArgTypes<WithVariant> = {
  variant: {
    control: 'select',
    options: ['primary', 'secondary'],
  },
};

const SIZE_ARG_TYPES: ArgTypes<WithSize> = {
  size: {
    control: 'select',
    options: ['small', 'medium'],
  },
};

const meta: Meta<CommonButtonArgs> = {
  title: 'Design System/Buttons/Standard Buttons',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=5-842',
    },
  },
  args: {
    disabled: false,
    loading: false,
  },
  decorators: [
    moduleMetadata({
      imports: [
        MatButtonModule,
        MatIconModule,
        CtaButtonDirective,
        ButtonSizeDirective,
        ButtonVariantDirective,
        ProgressSpinnerComponent,
      ],
    }),
  ],
};
export default meta;

export const Basic: StoryObj<CommonButtonArgs & WithVariant & WithSize> = {
  argTypes: {
    ...VARIANT_ARG_TYPES,
    ...SIZE_ARG_TYPES,
  },
  args: {
    variant: 'primary',
    size: 'medium',
  },
  render: (args) => ({
    template: `
    <button mat-button hraButtonVariant="${args.variant}" hraButtonSize="${args.size}" disabled="${args.disabled}">
    ${
      args.loading
        ? `<hra-progress-spinner size="small" [color]="'${args.variant === 'secondary' ? 'dark' : 'color'}'"></hra-progress-spinner>`
        : `Click Me!
      ${args.size !== 'small' ? '<mat-icon>download</mat-icon>' : ''}`
    }

    </button>`,
  }),
};

export const FlatRound: StoryObj<CommonButtonArgs> = {
  render: (args) => ({
    template: `
    <button mat-flat-button disabled="${args.disabled}">
    ${
      args.loading
        ? `<hra-progress-spinner size="small" color="light"></hra-progress-spinner>`
        : `Click Me!
      <mat-icon>download</mat-icon>`
    }

    </button>`,
  }),
};

export const CallToAction: StoryObj<CommonButtonArgs & WithVariant> = {
  argTypes: {
    ...VARIANT_ARG_TYPES,
  },
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    template: `
    <button mat-button hraCtaButton hraButtonVariant="${args.variant}" disabled="${args.disabled}">
    ${
      args.loading
        ? `<hra-progress-spinner size="small" [color]="'${args.variant === 'secondary' ? 'color' : 'light'}'"></hra-progress-spinner>`
        : `Click Me!
      <mat-icon iconPositionEnd>arrow_forward</mat-icon>`
    }
    </button>`,
  }),
};

export const ExtendedFAB: StoryObj<CommonButtonArgs> = {
  render: (args) => ({
    template: `<button mat-fab extended disabled="${args.disabled}">
      <mat-icon>download</mat-icon>
      Click Me!
    </button>`,
  }),
};
