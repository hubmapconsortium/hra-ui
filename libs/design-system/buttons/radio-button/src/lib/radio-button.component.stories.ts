import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Design System/Buttons/Radio Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1722-15005',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [MatRadioModule, FormsModule],
    }),
  ],
  args: {
    disabled: false,
    selectedValue: '1',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mat-radio-group [disabled]="disabled" [(ngModel)]="selectedValue">
        <mat-radio-button value="1">Option 1</mat-radio-button>
        <mat-radio-button value="2">Option 2</mat-radio-button>
      </mat-radio-group>
    `,
  }),
};
