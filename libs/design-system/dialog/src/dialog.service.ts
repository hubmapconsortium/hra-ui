import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData, NoticeComponent } from './lib/notice/notice.component';

/** Service to open dialog */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  /** Instance of MatDialog */
  private readonly matDialog = inject(MatDialog);

  /** Opens the dialog with necessary data and config */
  openNotice(title: string, message: string, action?: DialogData['action']): MatDialogRef<NoticeComponent> {
    return this.matDialog.open(NoticeComponent, {
      data: {
        title,
        message,
        action,
      } satisfies DialogData,
      panelClass: 'hra-dialog-panel',
    });
  }
}
