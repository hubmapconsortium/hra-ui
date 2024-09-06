import { importProvidersFrom } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { provideInput } from './providers';

const meta: Meta = {
  title: 'Input',
  decorators: [
    applicationConfig({
      providers: [provideInput(), importProvidersFrom(BrowserAnimationsModule)],
    }),
    moduleMetadata({
      imports: [MatFormFieldModule, MatInputModule],
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
      <mat-form-field [placeHolder]="'Test'">
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
