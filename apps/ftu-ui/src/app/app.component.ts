import { AfterContentInit, Component, HostBinding, Input, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { dispatchAction$, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { StorageId, StorageSelectors } from '@hra-ui/cdk/state';
import { ScreenNoticeBehaviorComponent } from '@hra-ui/components/behavioral';
import { configureActions } from './action-config';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hra-ftu-wc',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MatDialogModule],
})
export class AppComponent implements AfterContentInit {
  @Input() linksSrcUrl = '';

  @Input() resourcesSrcUrl = '';

  readonly linksUrl$ = new BehaviorSubject<string>('');

  readonly resourcesUrl$ = new BehaviorSubject<string>('');

  @HostBinding('class.mat-typography') readonly matTypography = true;

  readonly SMALL_VIEWPORT_THRESHOLD = 480; // In pixels

  screenSizeNoticeOpen = false;

  private readonly hasShownSmallViewportNotice = selectQuerySnapshot(
    StorageSelectors.get,
    StorageId.Local,
    'screen-size-notice'
  );

  private readonly dialog = inject(MatDialog);

  ngAfterContentInit(): void {
    this.detectSmallViewport();

    if (!this.linksSrcUrl) {
      this.linksSrcUrl = 'assets/links.yml';
    }

    if (!this.resourcesSrcUrl) {
      this.resourcesSrcUrl = 'assets/resources.yml';
    }
  }

  detectSmallViewport(): void {
    if (window.innerWidth <= this.SMALL_VIEWPORT_THRESHOLD && !this.hasShownSmallViewportNotice()) {
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
