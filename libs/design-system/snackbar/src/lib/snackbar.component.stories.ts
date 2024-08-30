import { Component, importProvidersFrom, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'hra-snackbar-demo',
  standalone: true,
  imports: [MatButtonModule],
  template: ` <button mat-flat-button (click)="snackbar.open(message(), action(), true)">Open Snackbar</button> `,
})
class SnackbarDemoComponent {
  readonly message = input<string>('');
  readonly action = input<string>('');
  readonly snackbar = inject(SnackbarService);
}

const meta: Meta<SnackbarDemoComponent> = {
  component: SnackbarDemoComponent,
  title: 'SnackBar',
  argTypes: {
    message: {
      type: 'string',
    },
    action: {
      type: 'string',
    },
  },
  args: {
    message: 'test message',
    action: 'test action',
  },
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    moduleMetadata({
      imports: [MatButtonModule, MatSnackBarModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
