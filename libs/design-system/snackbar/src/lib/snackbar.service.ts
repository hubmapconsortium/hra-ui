import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { ButtonPosition, SnackbarComponent, SnackbarData } from './snackbar.component';

export type SnackbarConfig = Omit<MatSnackBarConfig, 'data' | 'panelClass'>;

/** Service for snackbar. Opens the snackbar and configures it */
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  /** Reference to the MatSnackbar */
  readonly matSnackbar = inject(MatSnackBar);

  /** Opens the snackbar with provided config */
  open(
    message: string,
    action: string,
    close = false,
    actionButtonPosition: ButtonPosition = 'start',
    config?: SnackbarConfig,
  ): MatSnackBarRef<SnackbarComponent> {
    return this.matSnackbar.openFromComponent(SnackbarComponent, {
      announcementMessage: message,
      ...config,
      data: { message, action, close, actionButtonPosition } satisfies SnackbarData,
      panelClass: ['hra-snackbar-panel'],
    });
  }
}
