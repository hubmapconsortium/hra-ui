import { ChangeDetectionStrategy, Component, computed, effect, inject, input, model } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BaseApplicationComponent } from '@hra-ui/application';
import { LinkDirective } from '@hra-ui/cdk';
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
} from '@hra-ui/cdk/state';
import { HraCommonModule, routeData } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { FtuFullScreenService, TissueLibraryBehaviorComponent } from '@hra-ui/ftu-ui-components/src/lib/behavioral';
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
  Tissue,
} from '@hra-ui/services';
import {
  ActiveFtuActions,
  ActiveFtuSelectors,
  CellSummarySelectors,
  DownloadActions,
  DownloadSelectors,
  HraStateModule,
  IllustratorActions,
  IllustratorSelectors,
  LinkIds,
  SourceRefsSelectors,
  TissueLibraryActions,
  TissueLibrarySelectors,
} from '@hra-ui/state';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { filter, from, map, Observable, OperatorFunction, ReplaySubject, switchMap, take } from 'rxjs';

import { outputFromObservable } from '@angular/core/rxjs-interop';
import { environment } from '../environments/environment';

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
export function filterUndefined<T>(): OperatorFunction<T | undefined, T> {
  return filter((value): value is T => value !== undefined);
}

/** Main application component
 */
@Component({
  selector: 'ftu-ui-root',
  imports: [
    ButtonsModule,
    HraCommonModule,
    IconsModule,
    TissueLibraryBehaviorComponent,
    NavigationModule,
    RouterModule,
    CdkStateModule,
    HraServiceModule,
    HraStateModule,
    MatMenuModule,
    MatDividerModule,
    PlainTooltipDirective,
    LinkDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'hra-app mat-typography',
    '[class.app-height]': '!isLanding()',
  },
})
export class AppComponent extends BaseApplicationComponent {
  /** Illustration to display (choosen automatically if not provided) */
  readonly selectedIllustration = model<string | RawIllustration>();

  /** Set of all illustrations */
  readonly illustrations = input<string | RawIllustrationsJsonld>(environment.illustrationsUrl);

  /** Cell summaries to display in tables */
  readonly summaries = input<string | RawCellSummary>('');

  /** Datasets to display in the sources tab */
  readonly datasets = input<string | RawDatasets>('');

  /** Base href if different from the page */
  readonly baseHref = input<string>('');

  /** Application links */
  readonly appLinks = input<string>('assets/links.yml');

  /** Application resources */
  readonly appResources = input<string>('assets/resources.yml');

  /** Emits whenever a different illustration is selected by the user */
  readonly illustrationSelected = outputFromObservable(select$(ActiveFtuSelectors.iri).pipe(filterUndefined()), {
    alias: 'illustration-selected',
  });

  /** Emits when the mouse hover on/off a single cell */
  readonly cellHover = outputFromObservable(
    select$(IllustratorSelectors.selectedOnHovered).pipe(map((node) => node?.source)),
    { alias: 'cell-hover' },
  );

  /** Emits when the user clicks a cell */
  readonly cellClick = outputFromObservable(
    inject(Actions).pipe(
      ofActionDispatched(IllustratorActions.SetClicked),
      map(({ selectedOnClick }) => selectedOnClick.source),
    ),
    { alias: 'cell-click' },
  );

  /** Fullscreen service */
  private readonly fullscreenService = inject(FtuFullScreenService);
  /** The router */
  readonly router = inject(Router);
  /** Current route */
  private readonly activatedRoute = inject(ActivatedRoute);
  /** Enpoints used to load data */
  private readonly endpoints = inject(FTU_DATA_IMPL_ENDPOINTS) as ReplaySubject<FtuDataImplEndpoints>;

  /** Whether an illustration is active */
  private readonly isActive = selectSnapshot(ActiveFtuSelectors.isActive);
  /** Available Download Formats */
  protected readonly downloadFormats = selectSnapshot(DownloadSelectors.formats);
  /** Current filtered summaries for CSV export */
  protected readonly filteredSummaries = selectSnapshot(CellSummarySelectors.filteredSummaries);
  /** Source references used in summaries and downloads */
  protected readonly sourceReferences = selectSnapshot(SourceRefsSelectors.sourceReferences);
  /** Currently active FTU IRI */
  protected readonly activeIri = selectSnapshot(ActiveFtuSelectors.iri);

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
  /** Navigate */
  private readonly navigate = dispatch(LinkRegistryActions.Navigate);
  /** Load resources */
  private readonly loadResources = dispatch(ResourceRegistryActions.LoadFromYaml);
  /** Load datasets */
  private readonly loadDatasets = dispatch(TissueLibraryActions.Load);
  /** Clear the active illustration */
  private readonly clearActiveFtu = dispatch(ActiveFtuActions.Clear);
  /** Download Action Dispatcher */
  protected readonly download = dispatch(DownloadActions.Download);
  /** Download summaries action dispatcher */
  protected readonly downloadSummaries = dispatch(DownloadActions.DownloadSummaries);
  /** Download CSV action dispatcher */
  protected readonly downloadCsv = dispatch(DownloadActions.DownloadCsv);

  /** Signal for route data */
  private readonly data = routeData();

  /** Whether the current route is the landing page */
  protected readonly isLanding = computed(() => this.data()['isLanding'] === true || false);

  /** Breadcrumbs */
  protected readonly crumbs = computed(() => {
    const crumbs = (this.data()['crumbs'] as BreadcrumbItem[]) ?? [];
    const label = this.selectedFtu()?.label;
    if (!label || this.router.url === '/') {
      return crumbs;
    }
    return [...crumbs, { name: label.slice(0, 1).toUpperCase() + label.slice(1) } satisfies BreadcrumbItem];
  });

  /** Selected FTU */
  protected readonly selectedFtu = model<Tissue>();

  /** Determines whether fullscreen is active */
  readonly isFullscreen = this.fullscreenService.isFullscreen;

  /** Whether the component is initialized */
  private initialized = false;

  /** Illustration Metadata */
  protected readonly illustrationMetadata = LinkIds.Illustration;

  /** Whether the current page is the ftu page */
  protected get isFtuPage(): boolean {
    return this.router.isActive('/ftu', {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  /** Initialize the app */
  constructor() {
    super({ screenSizeNotice: { width: 1280, height: 720 } });

    this.router.initialNavigation();

    effect(() => {
      const selectors =
        this.baseHref() || !this.initialized
          ? UPDATE_ALL_SELECTORS
          : {
              appLinks: !!this.appLinks(),
              appResources: !!this.appResources(),
              baseHref: false,
              datasets: !!this.datasets(),
              illustrations: !!this.illustrations(),
              selectedIllustration: !!this.selectedIllustration(),
              summaries: !!this.summaries(),
            };

      this.applyUpdates(selectors);
      this.initialized = true;
    });
  }

  /**
   * Applies updates
   * @param selectors What parts to update
   */
  private applyUpdates(selectors: UpdateSelectors): void {
    const { baseHref } = this;
    let endpointsUpdated = false;
    const updateEndpointsOnce = () => {
      if (!endpointsUpdated && this.endpoints && typeof this.endpoints.next === 'function') {
        const { illustrations, datasets, summaries } = this;
        this.endpoints.next({
          illustrations: illustrationsInput(illustrations()) ?? '',
          datasets: rawDatasetsInput(datasets()) ?? '',
          summaries: rawCellSummariesInput(summaries()) ?? '',
          baseHref: baseHref(),
        });
        endpointsUpdated = true;
      }
    };

    if (selectors.baseHref) {
      this.setBaseHref(baseHref());
    }

    let linksLoading$: Observable<unknown> | undefined;
    if (selectors.appLinks) {
      linksLoading$ = this.loadLinks(setUrl(this.appLinks(), baseHref()));
    }

    if (selectors.appResources) {
      this.loadResources(setUrl(this.appResources(), baseHref()));
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
    const selected = selectedIllustrationInput(selectedIllustration());
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
        if (!this.isActive() && this.selectedIllustration() === undefined) {
          this.selectedIllustration.set(iri);
          this.updateSelectedIllustration();
        }
      });
  }
}
