import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonToggleSize, ButtonToggleSizeDirective } from './directives/button-toggle-size.directive';

interface ButtonToggleArgs {
  disabled?: boolean;
  size?: ButtonToggleSize;
}

const meta: Meta<ButtonToggleArgs> = {
  title: 'Design System/Buttons/Button Toggle',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=5-842',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  args: {
    disabled: false,
    size: 'large',
  },
  decorators: [
    moduleMetadata({
      imports: [MatButtonToggleModule, ButtonToggleSizeDirective],
    }),
  ],
};
export default meta;

export const Default: StoryObj<ButtonToggleArgs> = {
  render: (args) => ({
    props: args,
    template: `<mat-button-toggle-group hraButtonToggleSize="${args.size}" disabled="${args.disabled}">
      <mat-button-toggle>Toggle 1</mat-button-toggle>
      <mat-button-toggle>Toggle 2</mat-button-toggle>
      <mat-button-toggle>Toggle 3</mat-button-toggle>
    </mat-button-toggle-group>`,
  }),
};
