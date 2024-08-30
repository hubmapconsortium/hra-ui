import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent, SnackbarData } from './snackbar.component';

export type SnackbarConfig = Omit<MatSnackBarConfig, 'data' | 'panelClass'>;

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  readonly matSnackbar = inject(MatSnackBar);

  open(message: string, action: string, close = false, config?: SnackbarConfig): MatSnackBarRef<SnackbarComponent> {
    return this.matSnackbar.openFromComponent(SnackbarComponent, {
      announcementMessage: message,
      ...config,
      data: { message, action, close } satisfies SnackbarData,
      panelClass: ['hra-snackbar-panel'],
    });
  }
}
