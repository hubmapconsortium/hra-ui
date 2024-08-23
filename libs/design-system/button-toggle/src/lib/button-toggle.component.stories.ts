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
  render: () => ({
    template: `
      <mat-button-toggle-group name="buttonCheck" aria-label="Font Style">
        <mat-button-toggle value="button1" checked>Button</mat-button-toggle>
        <mat-button-toggle value="button2">Button</mat-button-toggle>
        <mat-button-toggle value="button3">Button</mat-button-toggle>
      </mat-button-toggle-group>

    `,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
