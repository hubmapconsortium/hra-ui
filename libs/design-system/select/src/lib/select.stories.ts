import { importProvidersFrom } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideSelect } from './providers';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

const meta: Meta = {
  title: 'Select',
  decorators: [
    applicationConfig({
      providers: [provideSelect(), importProvidersFrom(BrowserAnimationsModule)],
    }),
    moduleMetadata({
      imports: [MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <mat-form-field>
        <mat-label>Choose an option</mat-label>
        <mat-select disableRipple panelClass="options-container">
          <mat-option value="option1">Option 1</mat-option>
          <mat-option value="option2">Option 2</mat-option>
          <mat-option value="option3">Option 3</mat-option>
        </mat-select>
      </mat-form-field>
    `,
  }),
};

export const RequiredSelect: Story = {
  render: () => ({
    props: {
      selectFormControl: new FormControl<string | null>(null, Validators.required),
      options: ['option1', 'option2', 'option3'],
    },
    template: `
      <mat-form-field>
        <mat-label>Choose an option</mat-label>
        <mat-select disableRipple panelClass="options-container" [formControl]="selectFormControl" required>
          <mat-option>--</mat-option>
          @for (option of options; track option) {
            <mat-option [value]="option">{{option}}</mat-option>
          }
        </mat-select>
        @if (selectFormControl.hasError('required')) {
          <mat-error>Please choose an option</mat-error>
        }
      </mat-form-field>
    `,
  }),
};
