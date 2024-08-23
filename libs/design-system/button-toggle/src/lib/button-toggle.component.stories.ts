import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { provideButtonToggle } from './providers';
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
      imports: [MatButtonToggleModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const SingleSelect: Story = {
  render: () => ({
    template: `
    <h2>Single Select</h2>
      <mat-button-toggle-group name="singleSelect" aria-label="Single Select">
        <mat-button-toggle value="button1" checked>Button</mat-button-toggle>
        <mat-button-toggle value="button2">Button</mat-button-toggle>
        <mat-button-toggle value="button3">Button</mat-button-toggle>
      </mat-button-toggle-group>

      <h2>Multi Select</h2>
      <mat-button-toggle-group multiple name="multiSelect" aria-label="Multi Select">
        <mat-button-toggle value="button1" checked>Button</mat-button-toggle>
        <mat-button-toggle value="button2">Button</mat-button-toggle>
        <mat-button-toggle value="button3">Button</mat-button-toggle>
      </mat-button-toggle-group>
    `,
  }),
};
