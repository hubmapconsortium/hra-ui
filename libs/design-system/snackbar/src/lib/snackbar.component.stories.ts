import { Component, importProvidersFrom, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SnackbarService } from './snackbar.service';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonPosition, SnackbarData } from './snackbar.component';

@Component({
  selector: 'hra-snackbar-demo',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button
      mat-flat-button
      (click)="snackbar.open(message(), action(), close(), actionButtonPosition(), getSnackBarConfig())"
    >
      Open Snackbar
    </button>
  `,
})
class SnackbarDemoComponent {
  readonly message = input<string>('');
  readonly action = input<string>('');
  readonly close = input<boolean>(false);
  readonly actionButtonPosition = input<ButtonPosition>('start');
  readonly duration = input<number>();
  readonly snackbar = inject(SnackbarService);

  getSnackBarConfig() {
    if (this.close() === false) {
      return {
        duration: this.duration(),
      };
    } else {
      return {};
    }
  }
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
    duration: {
      type: 'number',
    },
  },
  args: {
    message: 'test message',
    action: 'test action',
    duration: 6000,
  },
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule), provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [MatButtonModule, MatSnackBarModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const SingleLineSnackbar: Story = {
  args: {
    message: 'Single-line snackbar',
    action: '',
    close: false,
  },
};

export const SingleLineSnackbarWithAction: Story = {
  args: {
    message: 'Single-line snackbar with action',
    action: 'Action',
    close: false,
  },
};

export const TwoLineSnackbarWithOutAction: Story = {
  args: {
    message: 'Two-line snackbar without action. This is some extra text',
    action: '',
    close: false,
  },
};

export const TwoLineSnackbarWithAction: Story = {
  args: {
    message: 'Two-line snackbar with action. This is some extra text',
    action: 'Action',
    close: false,
  } satisfies SnackbarData,
};

export const TwoLineSnackbarWithLongerAction: Story = {
  args: {
    message:
      'Two-line snackbar with action. This is some extra text along with some more additional textTwo-line snackbar with action. This is some extra text along with some more additional textTwo-line snackbar with action. This is some extra text along with some more additional textTwo-line snackbar with action. This is some extra text along with some more additional text',
    action: 'Action',
    close: false,
    actionButtonPosition: 'end',
  } satisfies SnackbarData,
};

export const SingleLineSnackbarWithClose: Story = {
  args: {
    message: 'Single-line snackbar with close',
    action: '',
    close: true,
  },
};

export const SingleLineSnackbarWithActionAndClose: Story = {
  args: {
    message: 'Single-line with action & close',
    action: 'Action',
    close: true,
  },
};

export const TwoLineSnackbarWithoutActionAndClose: Story = {
  args: {
    message: 'Two-line snackbar without action, with close',
    action: '',
    close: true,
  },
};

export const TwoLineSnackbarWithActionAndClose: Story = {
  args: {
    message: 'Two-line snackbar with action and close',
    action: 'Action',
    close: true,
  },
};

export const TwoLineSnackbarWithLongerActionAndClose: Story = {
  args: {
    message:
      'Two-line snackbar with action. This is some extra text along with some more additional textTwo-line snackbar with action. This is some extra text along with some more additional textTwo-line snackbar with action. This is some extra text along with some more additional textTwo-line snackbar with action. This is some extra text along with some more additional text',
    action: 'Action',
    close: true,
    actionButtonPosition: 'end',
  } satisfies SnackbarData,
};
