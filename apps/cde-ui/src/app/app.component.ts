import { AfterContentInit, Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ScreenSizeNoticeComponent } from './components/screen-size-notice/screen-size-notice.component';
import { MatDialog, MatDialogRef, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';

/**
 * App component for CDE
 */
@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScreenSizeNoticeComponent, MatDialogModule],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
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
  private ref = inject(MatDialogRef<ScreenSizeNoticeComponent>);
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
        minWidth: '28rem',
      };

      this.ref = this.dialog.open(ScreenSizeNoticeComponent, dialogConfig);
      this.ref.afterClosed().subscribe(() => (this.screenSizeNoticeOpen = false));
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
