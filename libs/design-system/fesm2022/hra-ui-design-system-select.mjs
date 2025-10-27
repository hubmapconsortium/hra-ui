import { importProvidersFrom } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

const meta = {
    title: 'Select',
    decorators: [
        applicationConfig({
            providers: [importProvidersFrom(BrowserAnimationsModule)],
        }),
        moduleMetadata({
            imports: [MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
        }),
    ],
};
const Default = {
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
const RequiredSelect = {
    render: () => ({
        props: {
            selectFormControl: new FormControl(null, Validators.required),
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
const SelectWithNoneOption = {
    render: () => ({
        props: {
            selectFormControl: new FormControl(null),
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        },
        template: `
      <mat-form-field>
        <mat-label>Choose an option</mat-label>
        <mat-select disableRipple panelClass="options-container" [formControl]="selectFormControl">
          <mat-option>None</mat-option>
          @for (option of options; track option) {
            <mat-option [value]="option">{{option}}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    `,
    }),
};

/**
 * Generated bundle index. Do not edit.
 */

export { Default, RequiredSelect, SelectWithNoneOption };
//# sourceMappingURL=hra-ui-design-system-select.mjs.map
