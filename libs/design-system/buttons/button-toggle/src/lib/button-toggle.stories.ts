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
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=853-284',
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
  },
  decorators: [
    moduleMetadata({
      imports: [MatButtonToggleModule, ButtonToggleSizeDirective],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `<mat-button-toggle-group hraButtonToggleSize="${args.size}" disabled="${args.disabled}">
      <mat-button-toggle>Toggle 1</mat-button-toggle>
      <mat-button-toggle>Toggle 2</mat-button-toggle>
      <mat-button-toggle>Toggle 3</mat-button-toggle>
    </mat-button-toggle-group>`,
  }),
};
export default meta;

export const Small: StoryObj<ButtonToggleArgs> = {
  args: {
    size: 'small',
  },
};

export const Medium: StoryObj<ButtonToggleArgs> = {
  args: {
    size: 'medium',
  },
};

export const Large: StoryObj<ButtonToggleArgs> = {
  args: {
    size: 'large',
  },
};
