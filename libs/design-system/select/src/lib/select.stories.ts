import { importProvidersFrom } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideSelect } from './providers';
import { SelectSizeDirective } from './select-size/select-size.directive';

const meta: Meta = {
  title: 'Select',
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideSelect(), importProvidersFrom(BrowserAnimationsModule)],
    }),
    moduleMetadata({
      imports: [MatSelectModule, MatFormFieldModule, SelectSizeDirective],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <mat-form-field hraSelectSize="${args['size']}">
        <mat-label>Choose an option</mat-label>
        <mat-select disableRipple [panelClass]="['options-container', 'options-container-${args['size']}']">
          <mat-option value="option1">Option 1</mat-option>
          <mat-option value="option2">Option 2</mat-option>
          <mat-option value="option3">Option 3</mat-option>
        </mat-select>
      </mat-form-field>
    `,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    size: 'large',
  },
};
