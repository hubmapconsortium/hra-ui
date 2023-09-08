import {
  AfterContentInit,
  Component,
  HostBinding,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { dispatch, dispatch$, select$, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import {
  LinkRegistryActions,
  ResourceRegistryActions,
  StorageId,
  StorageSelectors,
  createLinkId,
} from '@hra-ui/cdk/state';
import { ScreenNoticeBehaviorComponent } from '@hra-ui/components/behavioral';
import { FtuDataImplEndpoints, FTU_DATA_IMPL_ENDPOINTS, Iri } from '@hra-ui/services';
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
  readonly tissues = select$(TissueLibrarySelectors.tissues);

  @Input() set linksYamlUrl(url: string) {
    this.loadLinks(url);
  }

  @Input() set resourcesYamlUrl(url: string) {
    this.loadResources(url);
  }

  @Input() set organIri(iri: string) {
    iri ? this.navigateToOrgan(createLinkId('FTU'), { queryParams: { id: iri } }) : this.showDefaultIri();
  }

  @Input() datasetUrl = '';
  @Input() illustrationsUrl = '';
  @Input() summariesUrl = '';

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

  constructor() {
    inject(Router).initialNavigation();
  }

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

  ngOnInit() {
    this.endpoints = this.injector.get(FTU_DATA_IMPL_ENDPOINTS);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.endpoints = this.injector.get(FTU_DATA_IMPL_ENDPOINTS);
    if ('datasetUrl' in changes) {
      this.endpoints.datasets = this.datasetUrl as Iri;
      this.endpoints.illustrations = this.illustrationsUrl as Iri;
      this.endpoints.summaries = this.summariesUrl as Iri;
      this.reset()
        .pipe(
          tap(() => {
            this.reloadDataSets();
            this.reloadActiveFtu(changes['organIri'].currentValue);
          })
        )
        .subscribe();
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
