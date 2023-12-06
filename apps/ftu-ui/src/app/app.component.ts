import {
  AfterContentInit,
  Component,
  HostBinding,
  HostListener,
  inject,
  Injector,
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
  createLinkId,
  LinkRegistryActions,
  ResourceRegistryActions,
  StorageId,
  StorageSelectors,
} from '@hra-ui/cdk/state';
import { ScreenNoticeBehaviorComponent } from '@hra-ui/components/behavioral';
import { FTU_DATA_IMPL_ENDPOINTS, FtuDataImplEndpoints, Iri } from '@hra-ui/services';
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

  @Input() useCustomDatasetUrl = false;
  @Input() useCustomIllustrationsUrl = false;
  @Input() useCustomSummariesUrl = false;

  @Output() readonly organSelected = select$(ActiveFtuSelectors.iri);

  @Output() readonly nodeHovered = select$(IllustratorSelectors.selectedOnHovered);

  @Output() readonly nodeClicked = select$(IllustratorSelectors.selectedOnClicked);

  private readonly injector = inject(Injector);
  private endpoints?: FtuDataImplEndpoints;

  screenSizeNoticeOpen = false;

  private readonly hasShownSmallViewportNotice = selectQuerySnapshot(
    StorageSelectors.get,
    StorageId.Local,
    'screen-size-notice'
  );

  private readonly loadLinks = dispatch(LinkRegistryActions.LoadFromYaml);
  private readonly loadResources = dispatch(ResourceRegistryActions.LoadFromYaml);
  private readonly navigateToOrgan = dispatch(LinkRegistryActions.Navigate);
  private readonly setScreenSmall = dispatch(ScreenModeAction.SetSize);
  private readonly reloadDataSets = dispatch(TissueLibraryActions.Load);
  private readonly reloadActiveFtu = dispatch(ActiveFtuActions.Load);

  private readonly reset = dispatch$(ActiveFtuActions.Reset);

  private readonly dialog = inject(MatDialog);

  private ref = inject(MatDialogRef<ScreenNoticeBehaviorComponent>);

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
    this.endpoints = this.injector.get(FTU_DATA_IMPL_ENDPOINTS);
    this.endpoints.baseHref = this.baseHref as Iri;
    this.loadLinks(this.baseHref + this.linksYamlUrl);
    this.loadResources(this.baseHref + this.resourcesYamlUrl);
    this.endpoints.illustrations = ((this.useCustomIllustrationsUrl ? '' : this.baseHref) +
      this.illustrationsUrl) as Iri;
    this.endpoints.datasets = ((this.useCustomDatasetUrl ? '' : this.baseHref) + this.datasetUrl) as Iri;
    this.endpoints.summaries = ((this.useCustomSummariesUrl ? '' : this.baseHref) + this.summariesUrl) as Iri;
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
