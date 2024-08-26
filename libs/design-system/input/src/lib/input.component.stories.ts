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

export const Primary: Story = {
  args: {},
  render: () => ({
    template: `
      <h2>Floating Fill</h2>
      <mat-form-field>
        <mat-label>Input</mat-label>
        <input matInput>
      </mat-form-field>

      <h2>Floating Outlined</h2>
      <mat-form-field appearance="outline">
        <mat-label>Input</mat-label>
        <input matInput>
      </mat-form-field>

      <h2>Non Floating Fill</h2>
      <mat-form-field [placeHolder]="'Test'">
        <input matInput placeholder="Placeholder">
      </mat-form-field>

      <h2>Non Floating Outlined</h2>
      <mat-form-field appearance="outline">
        <input matInput placeholder="Placeholder">
      </mat-form-field>
    `,
  }),
};
