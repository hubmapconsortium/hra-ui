import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { dispatch, dispatch$, select$, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import {
  BaseHrefActions,
  createLinkId,
  LinkRegistryActions,
  ResourceRegistryActions,
  StorageId,
  StorageSelectors,
} from '@hra-ui/cdk/state';
import { ScreenNoticeBehaviorComponent } from '@hra-ui/components/behavioral';
import { FTU_DATA_IMPL_ENDPOINTS, FtuDataImplEndpoints, Url } from '@hra-ui/services';
import {
  ActiveFtuActions,
  ActiveFtuSelectors,
  IllustratorSelectors,
  ScreenModeAction,
  TissueLibraryActions,
  TissueLibrarySelectors,
} from '@hra-ui/state';
import { tap } from 'rxjs';

@Component({
  selector: 'ftu-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MatDialogModule],
})
export class AppComponent implements AfterContentInit, OnChanges, OnInit {
  @HostBinding('class.mat-typography') readonly matTypography = true;

  readonly SMALL_VIEWPORT_THRESHOLD = 480; // In pixels
  readonly WINDOW_RESIZE_THRESHOLD = 1600; // In pixels
  readonly tissues = select$(TissueLibrarySelectors.tissues);

  @Input() linksYamlUrl = '';

  @Input() resourcesYamlUrl = '';

  @Input() set organIri(iri: string) {
    iri ? this.navigateToOrgan(createLinkId('FTU'), { queryParams: { id: iri } }) : this.showDefaultIri();
  }

  @Input() datasetUrl = '';
  @Input() illustrationsUrl = '';
  @Input() summariesUrl = '';
  @Input() baseHref = '';

  @Output() readonly organSelected = select$(ActiveFtuSelectors.iri);

  @Output() readonly nodeHovered = select$(IllustratorSelectors.selectedOnHovered);

  @Output() readonly nodeClicked = select$(IllustratorSelectors.selectedOnClicked);

  screenSizeNoticeOpen = false;

  private readonly hasShownSmallViewportNotice = selectQuerySnapshot(
    StorageSelectors.get,
    StorageId.Local,
    'screen-size-notice'
  );

  private readonly setBaseHref = dispatch(BaseHrefActions.Set);
  private readonly loadLinks = dispatch(LinkRegistryActions.LoadFromYaml);
  private readonly loadResources = dispatch(ResourceRegistryActions.LoadFromYaml);
  private readonly navigateToOrgan = dispatch(LinkRegistryActions.Navigate);
  private readonly setScreenSmall = dispatch(ScreenModeAction.SetSize);
  private readonly reloadDataSets = dispatch(TissueLibraryActions.Load);
  private readonly reloadActiveFtu = dispatch(ActiveFtuActions.Load);

  private readonly reset = dispatch$(ActiveFtuActions.Reset);

  private readonly dialog = inject(MatDialog);

  private ref = inject(MatDialogRef<ScreenNoticeBehaviorComponent>);
  private readonly endpoints = inject(FTU_DATA_IMPL_ENDPOINTS) as EventEmitter<FtuDataImplEndpoints>;

  constructor() {
    inject(Router).initialNavigation();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.detectSmallViewport();
  }

  ngAfterContentInit(): void {
    this.detectSmallViewport();
  }

  detectSmallViewport(): void {
    if (
      window.innerWidth <= this.SMALL_VIEWPORT_THRESHOLD &&
      !this.hasShownSmallViewportNotice() &&
      !this.screenSizeNoticeOpen
    ) {
      const dialogConfig: MatDialogConfig = {
        disableClose: false,
        panelClass: 'custom-overlay',
        hasBackdrop: false,
        minWidth: '19.5rem',
      };

      this.ref = this.dialog.open(ScreenNoticeBehaviorComponent, dialogConfig);
      this.ref.afterClosed().subscribe(() => (this.screenSizeNoticeOpen = false));
      this.screenSizeNoticeOpen = true;
    }

    if (window.innerWidth > this.SMALL_VIEWPORT_THRESHOLD) {
      this.screenSizeNoticeOpen = false;
      this.dialog.closeAll();
    }
  }

  ngOnInit() {
    this.setBaseHref(this.baseHref);
    this.loadLinks(this.setUrl(this.linksYamlUrl));
    this.loadResources(this.setUrl(this.resourcesYamlUrl));
    this.endpoints.emit({
      illustrations: this.setUrl(this.illustrationsUrl),
      datasets: this.setUrl(this.datasetUrl),
      summaries: this.setUrl(this.summariesUrl),
      baseHref: this.baseHref as Url,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reset()
      .pipe(
        tap(() => {
          this.reloadDataSets();
          this.reloadActiveFtu(changes['organIri']?.currentValue);
        })
      )
      .subscribe();
  }

  private setUrl(url: string): Url {
    const { baseHref } = this;
    if (url.startsWith('http')) {
      return url as Url;
    } else if (baseHref !== '' && !baseHref.endsWith('/')) {
      return `${baseHref}/${url}` as Url;
    } else {
      return `${baseHref}${url}` as Url;
    }
  }

  showDefaultIri() {
    this.tissues
      .pipe(
        tap((nodes) => {
          for (const [key, { children }] of Object.entries(nodes)) {
            if (children.length > 0 && key) {
              this.organIri = children[0];
              break;
            }
          }
        })
      )
      .subscribe();
  }
}
