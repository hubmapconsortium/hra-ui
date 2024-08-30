import { Component, importProvidersFrom, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SnackbarComponent } from './snackbar.component';

@Component({
  selector: 'hra-snackbar-demo',
  standalone: true,
  template: ` <button (click)="openSnackbar()">Open Snackbar</button> `,
})
class SnackbarDemoComponent {
  readonly message = input('');

  private readonly snackbar = inject(MatSnackBar);

  openSnackbar(): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: {
        message: this.message(),
        action: '',
        close: true,
      },
    });
  }
}

const meta: Meta<SnackbarDemoComponent> = {
  component: SnackbarDemoComponent,
  title: 'SnackBar',
  argTypes: {
    message: {
      type: 'string',
    },
  },
  args: {
    message: 'test',
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
