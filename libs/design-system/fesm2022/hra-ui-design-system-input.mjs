import { importProvidersFrom } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

const meta = {
    title: 'Design System/Form Field',
    decorators: [
        applicationConfig({
            providers: [importProvidersFrom(BrowserAnimationsModule)],
        }),
        moduleMetadata({
            imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
        }),
    ],
    args: {
        disabled: false,
    },
};
const FloatingFill = {
    args: {},
    render: (args) => ({
        props: args,
        template: `
      <mat-form-field>
        <mat-label>Input</mat-label>
        <input matInput [disabled]="disabled">
      </mat-form-field>
    `,
    }),
};
const FloatingOutlined = {
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
const NonFloatingFill = {
    args: {},
    render: () => ({
        template: `
      <mat-form-field placeholder="Test">
        <input matInput placeholder="Placeholder">
      </mat-form-field>
    `,
    }),
};
const NonFloatingOutlined = {
    args: {},
    render: () => ({
        template: `
      <mat-form-field appearance="outline">
        <input matInput placeholder="Placeholder">
      </mat-form-field>
    `,
    }),
};
const RequiredInputWithValidation = {
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
const InputWithClearButton = {
    render: () => ({
        props: {
            inputFormControl: new FormControl(''),
        },
        template: `
      <mat-form-field>
        <mat-label>Search</mat-label>
        <input matInput [formControl]="inputFormControl" placeholder="Enter search term">
        @if (inputFormControl.value) {
          <button matIconButton matSuffix aria-label="Clear input" (click)="inputFormControl.setValue('')">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>
    `,
    }),
};
const RequiredInputWithClearButton = {
    render: () => ({
        props: {
            emailFormControl: new FormControl('', [Validators.email, Validators.required]),
        },
        template: `
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input type="email" matInput [formControl]="emailFormControl" placeholder="Enter email" required>
        @if (emailFormControl.value) {
          <button matIconButton matSuffix aria-label="Clear input" (click)="emailFormControl.setValue('')">
            <mat-icon>close</mat-icon>
          </button>
        }
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

/**
 * Generated bundle index. Do not edit.
 */

export { FloatingFill, FloatingOutlined, InputWithClearButton, NonFloatingFill, NonFloatingOutlined, RequiredInputWithClearButton, RequiredInputWithValidation };
//# sourceMappingURL=hra-ui-design-system-input.mjs.map
