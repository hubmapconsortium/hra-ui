import { AfterContentInit, Component, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ScreenSizeNoticeComponent } from './components/screen-size-notice/screen-size-notice.component';

/**
 * App component for CDE
 */
@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ScreenSizeNoticeComponent,
    MatDialogModule,
    MatButtonModule,
  ],
  selector: 'cde-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterContentInit {
  readonly SMALL_VIEWPORT_THRESHOLD_WIDTH = 831; // In pixels
  readonly SMALL_VIEWPORT_THRESHOLD_HEIGHT = 1279; // In pixels
  screenSizeNoticeOpen = false;

  private readonly dialog = inject(MatDialog);
  private readonly hasShownSmallViewportNotice = localStorage.getItem('cde-screen-size-notice-seen');

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.detectSmallViewport();
  }

  ngAfterContentInit(): void {
    this.detectSmallViewport();
  }

  detectSmallViewport(): void {
    if (
      (window.innerWidth <= this.SMALL_VIEWPORT_THRESHOLD_WIDTH ||
        window.innerHeight <= this.SMALL_VIEWPORT_THRESHOLD_HEIGHT) &&
      this.hasShownSmallViewportNotice !== 'true' &&
      !this.screenSizeNoticeOpen
    ) {
      const dialogConfig: MatDialogConfig = {
        panelClass: 'custom-overlay',
        minWidth: '485px',
      };
      const dialogRef = this.dialog.open(ScreenSizeNoticeComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(() => (this.screenSizeNoticeOpen = false));
      this.screenSizeNoticeOpen = true;
    }

    if (
      window.innerWidth > this.SMALL_VIEWPORT_THRESHOLD_WIDTH &&
      window.innerHeight > this.SMALL_VIEWPORT_THRESHOLD_HEIGHT
    ) {
      this.screenSizeNoticeOpen = false;
      this.dialog.closeAll();
    }
  }
}
