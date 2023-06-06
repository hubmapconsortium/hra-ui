import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ScreenSizeNoticeComponent } from '@hra-ui/components/molecules';

@Component({
  selector: 'ftu-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MatDialog, MatDialogModule],
})
export class AppComponent implements OnInit {
  @HostBinding('class.mat-typography') readonly matTypography = true;
  isModalDisplayed = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openModalIfViewportLessThan480px();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.openModalIfViewportLessThan480px();
  }

  openModalIfViewportLessThan480px(): void {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth < 481 && !this.isModalDisplayed) {
      this.isModalDisplayed = true;
      const dialogConfig: MatDialogConfig = {
        width: '312px',
        disableClose: false,
        panelClass: 'custom-overlay',
      };

      const dialogRef: MatDialogRef<ScreenSizeNoticeComponent> = this.dialog.open(
        ScreenSizeNoticeComponent,
        dialogConfig
      );

      dialogRef.afterClosed().subscribe(() => {
        this.isModalDisplayed = false;
      });
    } else if (viewportWidth >= 481 && this.isModalDisplayed) {
      this.dialog.closeAll();
    }
  }
}
