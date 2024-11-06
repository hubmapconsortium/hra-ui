import { importProvidersFrom } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { provideInput } from './providers';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

const meta: Meta = {
  title: 'Input',
  decorators: [
    applicationConfig({
      providers: [provideInput(), importProvidersFrom(BrowserAnimationsModule)],
    }),
    moduleMetadata({
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const FloatingFill: Story = {
  args: {},
  render: () => ({
    template: `
      <mat-form-field>
        <mat-label>Input</mat-label>
        <input matInput>
      </mat-form-field>
    `,
  }),
};

export const FloatingOutlined: Story = {
  args: {},
  render: () => ({
    template: `
      <mat-form-field appearance="outline">
        <mat-label>Input</mat-label>
        <input matInput>
      </mat-form-field>
    `,
  }),
};

export const NonFloatingFill: Story = {
  args: {},
  render: () => ({
    template: `
      <mat-form-field placeholder="Test">
        <input matInput placeholder="Placeholder">
      </mat-form-field>
    `,
  }),
};

export const NonFloatingOutlined: Story = {
  args: {},
  render: () => ({
    template: `
      <mat-form-field appearance="outline">
        <input matInput placeholder="Placeholder">
      </mat-form-field>
    `,
  }),
};

export const RequiredInputWithValidation: Story = {
  render: () => ({
    props: {
      emailFormControl: new FormControl('', [Validators.email, Validators.required]),
    },
    template: `
      <mat-form-field>
        <mat-label>Input</mat-label>
        <input type="email" matInput [formControl]="emailFormControl" placeholder="Enter email">
        @if (emailFormControl.hasError('email') && !emailFormControl.hasError('required')) {
          <mat-error>Please enter a valid email address</mat-error>
        }
        @if (emailFormControl.hasError('required')) {
          <mat-error>Email is <strong>required</strong></mat-error>
        }
      </mat-form-field>
    `,
  }),
};
