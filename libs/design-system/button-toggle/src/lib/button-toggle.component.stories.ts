import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { provideButtonToggle } from './providers';
import { ToggleButtonSizeDirective } from './button-toggle-size/button-toggle-size.directive';
const meta: Meta = {
  title: 'ButtonToggleComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=853-284',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideButtonToggle()],
    }),
    moduleMetadata({
      imports: [MatButtonToggleModule, ToggleButtonSizeDirective],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const SingleSelect: Story = {
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'large'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <mat-button-toggle-group name="singleSelect" aria-label="Single Select"
      hideSingleSelectionIndicator
      hraButtonToggleSize="${args['size']}">
        <mat-button-toggle disableRipple value="button1" checked>Button</mat-button-toggle>
        <mat-button-toggle disableRipple value="button2">Button</mat-button-toggle>
        <mat-button-toggle disableRipple disabled value="button3">Button</mat-button-toggle>
      </mat-button-toggle-group>
    `,
  }),
};

export const MultiSelect: Story = {
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'large'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <mat-button-toggle-group multiple name="multiSelect" aria-label="Multi Select"
      hideMultipleSelectionIndicator
      hraButtonToggleSize="${args['size']}">
        <mat-button-toggle disableRipple value="button1" checked>Button</mat-button-toggle>
        <mat-button-toggle disableRipple value="button2">Button</mat-button-toggle>
        <mat-button-toggle disableRipple value="button3">Button</mat-button-toggle>
      </mat-button-toggle-group>
    `,
  }),
};
