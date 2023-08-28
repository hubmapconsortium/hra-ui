import { AfterContentInit, Component, EventEmitter, HostBinding, Input, Output, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { dispatch, select$, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import {
  LinkRegistryActions,
  ResourceRegistryActions,
  StorageId,
  StorageSelectors,
  createLinkId,
} from '@hra-ui/cdk/state';
import { ScreenNoticeBehaviorComponent } from '@hra-ui/components/behavioral';
import { ActiveFtuSelectors, IllustratorActions } from '@hra-ui/state';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hra-ftu-wc',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MatDialogModule],
})
export class AppComponent implements AfterContentInit {
  @HostBinding('class.mat-typography') readonly matTypography = true;

  readonly SMALL_VIEWPORT_THRESHOLD = 480; // In pixels

  @Input() set linksYamlUrl(url: string) {
    this.loadLinks(url);
  }

  @Input() set resourcesYamlUrl(url: string) {
    this.loadResources(url);
  }

  @Input() set organIri(iri: string) {
    this.navigateToOrgan(createLinkId('FTU'), { queryParams: { id: iri } });
  }

  @Output() readonly organSelected = select$(ActiveFtuSelectors.iri);

  @Output() readonly nodeClicked = dispatch(IllustratorActions.SetSelection);

  screenSizeNoticeOpen = false;

  private readonly hasShownSmallViewportNotice = selectQuerySnapshot(
    StorageSelectors.get,
    StorageId.Local,
    'screen-size-notice'
  );

  private readonly loadLinks = dispatch(LinkRegistryActions.LoadFromYaml);
  private readonly loadResources = dispatch(ResourceRegistryActions.LoadFromYaml);
  private readonly navigateToOrgan = dispatch(LinkRegistryActions.Navigate);

  private readonly dialog = inject(MatDialog);

  ngAfterContentInit(): void {
    this.detectSmallViewport();
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
