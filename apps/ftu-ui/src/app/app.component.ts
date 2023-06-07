import { Component, HostBinding, HostListener, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { StorageId, StorageSelectors } from '@hra-ui/cdk/state';
import { ScreenNoticeBehaviorComponent } from '@hra-ui/components/behavioral';

@Component({
  selector: 'ftu-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MatDialog, MatDialogModule],
})
export class AppComponent implements OnInit {
  @HostBinding('class.mat-typography') readonly matTypography = true;

  screenSizeNoticeOpen = false;

  private readonly screenSizeNoticeShown = selectQuerySnapshot(
    StorageSelectors.get,
    StorageId.Local,
    'screen-size-notice'
  );

  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.openModalIfViewportLessThan480px();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.openModalIfViewportLessThan480px();
  }

  openModalIfViewportLessThan480px(): void {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth <= 480 && !this.screenSizeNoticeShown()) {
      const dialogConfig: MatDialogConfig = {
        width: '312px',
        disableClose: false,
        panelClass: 'custom-overlay',
      };

      const ref = this.dialog.open(ScreenNoticeBehaviorComponent, dialogConfig);
      ref.afterClosed().subscribe(() => (this.screenSizeNoticeOpen = false));
      this.screenSizeNoticeOpen = true;
    }
  }
}
