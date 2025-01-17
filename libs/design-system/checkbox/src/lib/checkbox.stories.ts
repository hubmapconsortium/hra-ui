import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { CheckboxErrorVariantDirective } from './checkbox-error-variant/checkbox-error-variant-directive';

const meta: Meta = {
  title: 'Checkbox',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=6791-24001&t=KSPA1HRCXrHUsgVn-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [MatCheckboxModule, CheckboxErrorVariantDirective],
    }),
  ],
  args: {
    indeterminate: false,
    disabled: false,
  },
  argTypes: {
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    template: `
      <mat-checkbox [indeterminate]=${args['indeterminate']} [disabled]=${args['disabled']}></mat-checkbox>
    `,
  }),
};

export const ErrorState: Story = {
  render: (args) => ({
    template: `
      <mat-checkbox [indeterminate]=${args['indeterminate']} [disabled]=${args['disabled']} hraCheckboxErrorVariant></mat-checkbox>
    `,
  }),
};
