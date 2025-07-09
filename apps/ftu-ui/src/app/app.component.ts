/* eslint-disable @angular-eslint/no-output-rename -- Allow rename for custom element events */
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { dispatch, dispatch$, select$, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import {
  BaseHrefActions,
  CdkStateModule,
  createLinkId,
  InternalLinkEntry,
  LinkRegistryActions,
  LinkRegistrySelectors,
  LinkType,
  ResourceRegistryActions,
  StorageId,
  StorageSelectors,
} from '@hra-ui/cdk/state';
import { ScreenNoticeBehaviorComponent, TissueLibraryBehaviorComponent } from './ftu-components/behavioral/src';
import {
  FTU_DATA_IMPL_ENDPOINTS,
  FtuDataImplEndpoints,
  HraServiceModule,
  illustrationsInput,
  rawCellSummariesInput,
  RawCellSummary,
  RawDatasets,
  rawDatasetsInput,
  RawIllustration,
  RawIllustrationsJsonld,
  selectedIllustrationInput,
  setUrl,
} from '@hra-ui/services';
import {
  ActiveFtuActions,
  ActiveFtuSelectors,
  HraStateModule,
  IllustratorActions,
  IllustratorSelectors,
  LinkIds,
  MouseTrackerModule,
  ScreenModeSelectors,
  TissueLibraryActions,
  TissueLibrarySelectors,
} from '@hra-ui/state';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { filter, from, map, Observable, OperatorFunction, ReplaySubject, switchMap, take } from 'rxjs';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';

/** Input property keys */
type InputProps =
  | 'selectedIllustration'
  | 'illustrations'
  | 'datasets'
  | 'summaries'
  | 'baseHref'
  | 'appLinks'
  | 'appResources';

/** Used by applyUpdates to determine which part of the app needs updates */
type UpdateSelectors = Record<InputProps, boolean>;

/** Link to main ftu page */
export const ftuPage = createLinkId('FTU');

/** Small view port size in pixels */
const SMALL_VIEWPORT_THRESHOLD = 480; // In pixels

/** Update selection where every part of the app should update  */
const UPDATE_ALL_SELECTORS: UpdateSelectors = {
  appLinks: true,
  appResources: true,
  baseHref: true,
  datasets: true,
  illustrations: true,
  selectedIllustration: true,
  summaries: true,
};

/**
 * Creates an observable operator function that remove undefined values from a stream
 * @returns Observable operator function
 */
function filterUndefined<T>(): OperatorFunction<T | undefined, T> {
  return filter((value): value is T => value !== undefined);
}

/** Main application component
 */
@Component({
  selector: 'ftu-ui-root',
  imports: [
    ButtonsModule,
    CommonModule,
    IconsModule,
    TissueLibraryBehaviorComponent,
    MouseTrackerModule,
    NavigationModule,
    RouterModule,
    CdkStateModule,
    HraServiceModule,
    HraStateModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterContentInit, OnChanges, OnInit {
  /** Host binding of app component */
  @HostBinding('class.mat-typography') readonly matTypography = true;

  /** Illustration to display (choosen automatically if not provided) */
  @Input() selectedIllustration?: string | RawIllustration;

  /** Set of all illustrations */
  @Input() illustrations: string | RawIllustrationsJsonld =
    'https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld';

  /** Cell summaries to display in tables */
  @Input() summaries: string | RawCellSummary = '';

  /** Datasets to display in the sources tab */
  @Input() datasets: string | RawDatasets = '';

  /** Base href if different from the page */
  @Input() baseHref = '';

  /** Application links */
  @Input() appLinks = 'assets/links.yml';
  /** Application resources */
  @Input() appResources = 'assets/resources.yml';

  /** Emits whenever a different illustration is selected by the user */
  @Output('illustration-selected') readonly illustrationSelected = select$(ActiveFtuSelectors.iri).pipe(
    filterUndefined(),
  );

  /** Emits when the mouse hover on/off a single cell */
  @Output('cell-hover') readonly cellHover = select$(IllustratorSelectors.selectedOnHovered).pipe(
    map((node) => node?.source),
  );

  /** Emits when the user clicks a cell */
  @Output('cell-click') readonly cellClick = inject(Actions).pipe(
    ofActionDispatched(IllustratorActions.SetClicked),
    map(({ selectedOnClick }) => selectedOnClick.source),
  );

  /** Whether in full screen mode */
  readonly isFullscreen = selectSnapshot(ScreenModeSelectors.isFullScreen);
  /** Whether an illustration is active */
  private readonly isActive = selectSnapshot(ActiveFtuSelectors.isActive);
  /** Loaded tissues */
  private readonly tissues = select$(TissueLibrarySelectors.tissues);
  /** Get link entries */
  private readonly getInternalLinkEntry = selectQuerySnapshot(LinkRegistrySelectors.query)<InternalLinkEntry>;

  /** Updates the application base href */
  private readonly setBaseHref = dispatch(BaseHrefActions.Set);
  /** Load links */
  private readonly loadLinks = dispatch$(LinkRegistryActions.LoadFromYaml);
  /** Update link */
  private readonly updateLink = dispatch(LinkRegistryActions.Add);
  /** Load resources */
  private readonly loadResources = dispatch(ResourceRegistryActions.LoadFromYaml);
  /** Load datasets */
  private readonly loadDatasets = dispatch(TissueLibraryActions.Load);
  /** Navigate */
  private readonly navigate = dispatch(LinkRegistryActions.Navigate);
  /** Clear the active illustration */
  private readonly clearActiveFtu = dispatch(ActiveFtuActions.Clear);

  /** The router */
  readonly router = inject(Router);
  /** Current route */
  private readonly activatedRoute = inject(ActivatedRoute);

  /** Enpoints used to load data */
  private readonly endpoints = inject(FTU_DATA_IMPL_ENDPOINTS) as ReplaySubject<FtuDataImplEndpoints>;

  /** Whether the component is initialized */
  private initialized = false;

  /** Initializes the component */
  ngOnInit(): void {
    this.router.initialNavigation();

    // Ensure updates are run even when no inputs have been set
    if (!this.initialized) {
      this.ngOnChanges({});
    }
  }

  /** Updates the state when inputs change */
  ngOnChanges(changes: SimpleChanges) {
    const selectors =
      'baseHref' in changes || !this.initialized
        ? UPDATE_ALL_SELECTORS
        : {
            appLinks: 'appLinks' in changes,
            appResources: 'appResources' in changes,
            baseHref: false,
            datasets: 'datasets' in changes,
            illustrations: 'illustrations' in changes,
            selectedIllustration: 'selectedIllustration' in changes,
            summaries: 'summaries' in changes,
          };

    this.applyUpdates(selectors);
    this.initialized = true;
  }

  /**
   * Applies updates
   * @param selectors What parts to update
   */
  private applyUpdates(selectors: UpdateSelectors): void {
    const { baseHref } = this;
    let endpointsUpdated = false;
    const updateEndpointsOnce = () => {
      if (!endpointsUpdated) {
        const { illustrations, datasets, summaries } = this;
        this.endpoints.next({
          illustrations: illustrationsInput(illustrations) ?? '',
          datasets: rawDatasetsInput(datasets) ?? '',
          summaries: rawCellSummariesInput(summaries) ?? '',
          baseHref,
        });
        endpointsUpdated = true;
      }
    };

    if (selectors.baseHref) {
      this.setBaseHref(baseHref);
    }

    let linksLoading$: Observable<unknown> | undefined;
    if (selectors.appLinks) {
      linksLoading$ = this.loadLinks(setUrl(this.appLinks, baseHref));
    }

    if (selectors.appResources) {
      this.loadResources(setUrl(this.appResources, baseHref));
    }

    if (selectors.datasets) {
      updateEndpointsOnce();
      this.loadDatasets();
    }

    if (selectors.illustrations || selectors.summaries) {
      updateEndpointsOnce();
      this.clearActiveFtu();
    }

    if (selectors.selectedIllustration || selectors.illustrations || selectors.summaries) {
      if (linksLoading$) {
        linksLoading$.subscribe(() => this.updateSelectedIllustration());
      } else {
        this.updateSelectedIllustration();
      }
    }
  }

  /**
   * Updates the selected illustration using a default if not provided
   */
  private updateSelectedIllustration(): void {
    const { selectedIllustration } = this;
    const selected = selectedIllustrationInput(selectedIllustration);
    if (selected) {
      const iri = typeof selected === 'string' ? selected : selected['@id'];
      this.updateLink(LinkIds.ExploreFTU, {
        ...this.getInternalLinkEntry(LinkIds.ExploreFTU, LinkType.Internal),
        extras: {
          queryParams: {
            id: iri,
          },
        },
      });

      const name = this.activatedRoute.snapshot.data['name'];
      if (name === 'ftu') {
        this.navigate(ftuPage, {
          queryParams: {
            id: iri,
          },
        });
      }
    } else {
      this.setDefaultSelectedIllustration();
    }
  }

  /**
   * Select a default illustration
   */
  private setDefaultSelectedIllustration(): void {
    this.tissues
      .pipe(
        switchMap((tissues) => from(Object.values(tissues))),
        filter(({ children }) => children.length > 0),
        map(({ children }) => children[0]),
        take(1),
      )
      .subscribe((iri) => {
        if (!this.isActive() && this.selectedIllustration === undefined) {
          this.selectedIllustration = iri;
          this.updateSelectedIllustration();
        }
      });
  }

  /** Screen size notice open of app component */
  screenSizeNoticeOpen = false;

  /** Determines whether shown small viewport notice has been displayed */
  private readonly hasShownSmallViewportNotice = selectQuerySnapshot(
    StorageSelectors.get,
    StorageId.Local,
    'screen-size-notice',
  );

  /** Dialog  of app component */
  private readonly dialog = inject(MatDialog);

  /** Host listener for window resize events */
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.detectSmallViewport();
  }

  /** Lifecycle hook that is called after content has been projected into the component */
  ngAfterContentInit(): void {
    this.detectSmallViewport();
  }

  /** Detect small viewport */
  detectSmallViewport(): void {
    if (
      window.innerWidth <= SMALL_VIEWPORT_THRESHOLD &&
      !this.hasShownSmallViewportNotice() &&
      !this.screenSizeNoticeOpen
    ) {
      const dialogConfig: MatDialogConfig = {
        disableClose: false,
        panelClass: 'custom-overlay',
        hasBackdrop: false,
        minWidth: '19.5rem',
      };

      const ref = this.dialog.open(ScreenNoticeBehaviorComponent, dialogConfig);
      ref.afterClosed().subscribe(() => (this.screenSizeNoticeOpen = false));
      this.screenSizeNoticeOpen = true;
    }

    if (window.innerWidth > SMALL_VIEWPORT_THRESHOLD) {
      this.screenSizeNoticeOpen = false;
      this.dialog.closeAll();
    }
  }
}
