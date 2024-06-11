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
  RawCellSummary,
  RawDatasets,
  RawIllustration,
  RawIllustrationsJsonld,
  setUrl,
} from '@hra-ui/services';
import {
  ActiveFtuActions,
  ActiveFtuSelectors,
  IllustratorSelectors,
  ScreenModeAction,
  ScreenModeSelectors,
  TissueLibraryActions,
  TissueLibrarySelectors,
} from '@hra-ui/state';
import { filter, from, map, ReplaySubject, switchMap, take } from 'rxjs';

type InputProps =
  | 'selectedIllustration'
  | 'illustrations'
  | 'datasets'
  | 'summaries'
  | 'baseHref'
  | 'appLinks'
  | 'appResources';
type UpdateSelectors = Record<InputProps, boolean>;

export const ftuPage = createLinkId('FTU');

const UPDATE_ALL_SELECTORS: UpdateSelectors = {
  appLinks: true,
  appResources: true,
  baseHref: true,
  datasets: true,
  illustrations: true,
  selectedIllustration: true,
  summaries: true,
};

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
  @Input() selectedIllustration?: string | RawIllustration;
  @Input() illustrations: string | RawIllustrationsJsonld =
    'https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld';
  @Input() datasets: string | RawDatasets = '';
  @Input() summaries: string | RawCellSummary = '';
  @Input() baseHref = '';

  @Input() appLinks = 'assets/links.yml';
  @Input() appResources = 'assets/resources.yml';

  @Output('illustration-selected') readonly illustrationSelected = select$(ActiveFtuSelectors.iri).pipe(
    filter((iri: string | undefined): iri is string => iri !== undefined),
  );

  @Output('cell-hover') readonly cellHover = select$(IllustratorSelectors.selectedOnHovered).pipe(
    map((node) => node?.source),
  );

  @Output('cell-click') readonly cellClick = select$(IllustratorSelectors.selectedOnClicked).pipe(
    map((node) => node?.source),
  );

  readonly isFullscreen = selectSnapshot(ScreenModeSelectors.isFullScreen);
  private readonly isActive = selectSnapshot(ActiveFtuSelectors.isActive);
  private readonly tissues = select$(TissueLibrarySelectors.tissues);

  private readonly setBaseHref = dispatch(BaseHrefActions.Set);
  private readonly loadLinks = dispatch(LinkRegistryActions.LoadFromYaml);
  private readonly loadResources = dispatch(ResourceRegistryActions.LoadFromYaml);
  private readonly loadDatasets = dispatch(TissueLibraryActions.Load);
  private readonly setScreenSmall = dispatch(ScreenModeAction.SetSize, 'small');
  private readonly navigate = dispatch(LinkRegistryActions.Navigate);
  private readonly clearActiveFtu = dispatch(ActiveFtuActions.Clear);

  private readonly endpoints = inject(FTU_DATA_IMPL_ENDPOINTS) as ReplaySubject<FtuDataImplEndpoints>;

  private initialized = false;

  ngOnInit() {
    this.setScreenSmall();
    this.initialized = true;
  }

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
  }

  private applyUpdates(selectors: UpdateSelectors): void {
    const { baseHref } = this;
    let endpointsUpdated = false;
    const updateEndpointsOnce = () => {
      if (!endpointsUpdated) {
        const { illustrations, datasets, summaries, baseHref } = this;
        this.endpoints.next({
          illustrations,
          datasets,
          summaries,
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

  private updateSelectedIllustration(): void {
    const { selectedIllustration: selected } = this;
    if (selected === undefined) {
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
