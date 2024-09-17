/* eslint-disable @angular-eslint/no-output-rename -- Allow rename for custom element events */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { dispatch, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { BaseHrefActions, createLinkId, LinkRegistryActions, ResourceRegistryActions } from '@hra-ui/cdk/state';
import {
  BiomarkerDetailsWcComponent,
  FooterBehaviorComponent,
  HeaderBehaviorComponent,
  HraLandingPageIntroWcBehaviourComponent,
  TissueLibraryBehaviorComponent,
} from '@hra-ui/components/behavioral';
import { FullscreenContainerComponent, FullscreenContentComponent } from '@hra-ui/components/molecules';
import {
  FTU_DATA_IMPL_ENDPOINTS,
  FtuDataImplEndpoints,
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
  IllustratorActions,
  IllustratorSelectors,
  ScreenModeAction,
  ScreenModeSelectors,
  TissueLibraryActions,
  TissueLibrarySelectors,
} from '@hra-ui/state';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { filter, from, map, OperatorFunction, ReplaySubject, switchMap, take } from 'rxjs';

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

/** FTU ui small web component */
@Component({
  selector: 'hra-root',
  imports: [
    HeaderBehaviorComponent,
    TissueLibraryBehaviorComponent,
    HraLandingPageIntroWcBehaviourComponent,
    BiomarkerDetailsWcComponent,
    FooterBehaviorComponent,
    FullscreenContainerComponent,
    FullscreenContentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent implements OnInit, OnChanges {
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

  /** Updates the application base href */
  private readonly setBaseHref = dispatch(BaseHrefActions.Set);
  /** Load links */
  private readonly loadLinks = dispatch(LinkRegistryActions.LoadFromYaml);
  /** Load resources */
  private readonly loadResources = dispatch(ResourceRegistryActions.LoadFromYaml);
  /** Load datasets */
  private readonly loadDatasets = dispatch(TissueLibraryActions.Load);
  /** Set the screen size to small */
  private readonly setScreenSmall = dispatch(ScreenModeAction.SetSize, 'small');
  /** Navigate */
  private readonly navigate = dispatch(LinkRegistryActions.Navigate);
  /** Clear the active illustration */
  private readonly clearActiveFtu = dispatch(ActiveFtuActions.Clear);

  /** Enpoints used to load data */
  private readonly endpoints = inject(FTU_DATA_IMPL_ENDPOINTS) as ReplaySubject<FtuDataImplEndpoints>;

  /** Whether the component is initialized */
  private initialized = false;

  /** Initializes the component */
  ngOnInit() {
    this.setScreenSmall();

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
        const { illustrations, datasets, summaries, baseHref } = this;
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

    if (selectors.appLinks) {
      this.loadLinks(setUrl(this.appLinks, baseHref));
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
      this.updateSelectedIllustration();
    }
  }

  /**
   * Updates the selected illustration using a default if not provided
   */
  private updateSelectedIllustration(): void {
    const { selectedIllustration } = this;
    const selected = selectedIllustrationInput(selectedIllustration);
    if (selected === undefined || selected === '') {
      this.setDefaultSelectedIllustration();
    } else {
      const iri = typeof selected === 'string' ? selected : selected['@id'];
      this.navigate(ftuPage, {
        queryParams: {
          id: iri,
        },
      });
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
}
