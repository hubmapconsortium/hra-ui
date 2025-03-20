import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';

/** Type for button position */
export type ButtonPosition = 'start' | 'end';

/** interface for snackbar data */
export interface SnackbarData {
  /** Message in the snackbar */
  message: string;
  /** Action button */
  action?: string;
  /** Flag to show/hide the close button */
  close?: boolean;
  /** Position of the action button */
  actionButtonPosition?: ButtonPosition;
}

/** Snackbar component */
@Component({
  selector: 'hra-snackbar',
  imports: [CommonModule, MatIconModule, ButtonsModule, IconButtonSizeDirective],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  /** Reference to the MatSnackbarRef */
  protected readonly snackbarRef = inject(MatSnackBarRef);

  /** Injection token for the snackbar data*/
  protected readonly data: SnackbarData = inject(MAT_SNACK_BAR_DATA);
}
