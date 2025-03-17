import { Immutable } from '@angular-ru/cdk/typings';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filter } from '@hra-api/ng-client';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { ALL_ORGANS, BodyUiComponent, GlobalConfigState, OrganInfo, TrackingPopupComponent } from 'ccf-shared';
import { ConsentService, LocalStorageSyncService } from 'ccf-shared/analytics';
import { JsonLd } from 'jsonld/jsonld-spec';
import { combineLatest } from 'rxjs';

import { toSignal } from '@angular/core/rxjs-interop';
import { OntologySelection } from './core/models/ontology-selection';
import { actionAsFn } from './core/store/action-as-fn';
import { DataStateSelectors } from './core/store/data/data.selectors';
import {
  DataState,
  DEFAULT_FILTER_AGE_HIGH,
  DEFAULT_FILTER_AGE_LOW,
  DEFAULT_FILTER_BMI_HIGH,
  DEFAULT_FILTER_BMI_LOW,
} from './core/store/data/data.state';
import { ListResultsState } from './core/store/list-results/list-results.state';
import { SceneState } from './core/store/scene/scene.state';
import { RemoveSearch, SetSelectedSearches } from './core/store/spatial-search-filter/spatial-search-filter.actions';
import { SpatialSearchFilterSelectors } from './core/store/spatial-search-filter/spatial-search-filter.selectors';
import { SpatialSearchFlowService } from './shared/services/spatial-search-flow.service';

interface AppOptions {
  /** A list of data sources (in n3, rdf, xml, owl, or jsonld format) */
  dataSources: (string | JsonLd)[];
  /** Service Token. */
  token?: string;
  theme?: string;
  header?: boolean;
  homeUrl?: string;
  logoTooltip?: string;
  selectedOrgans?: string[];
  loginEnabled?: boolean;
  baseHref?: string;
  filter?: Partial<Filter>;
  loginDisabled?: boolean;
}

export interface DonorFormControls {
  organ: FormControl<OrganInfo | string | null>;
}

/**
 * This is the main angular component that all the other components branch off from.
 * It is in charge of the header and drawer components who have many sub-components.
 */
@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppComponent implements OnInit {
  @Dispatch()
  readonly setSelectedSearches = actionAsFn(SetSelectedSearches);

  @Dispatch()
  readonly removeSpatialSearch = actionAsFn(RemoveSearch);

  readonly menuOptions: string[] = ['Anatomical Structures', 'Cell Types', 'Biomarkers'];
  readonly ontologyTooltips: Record<string, string> = {
    as: 'Parts of the body in defined locations and regions, including the surface, internal organs and tissues. These structures may be described by gross or microscopic morphology and include functional tissue units and highly organized cellular ecosystems (such as alveoli in the lungs).',
    ct: 'Mammalian cells are biological units with a defined function that typically have a nucleus and cytoplasm surrounded by a membrane. Each cell type may have broad common functions across organs and specialized functions or morphological or molecular features within each organ or region. For example, epithelial cells in the skin, lungs and kidneys may have shared and specialized functions according to tissue localization.',
    b: 'Molecular, histological, morphological, radiological, physiological or anatomical features that help to characterize the biological state of the body. Here we focus on the molecular markers that can be measured to characterize a cell type.',
  };

  selectedtoggleOptions: string[] = [];

  private readonly store = inject(Store);
  protected readonly data = inject(DataState);
  protected readonly spatialFlowService = inject(SpatialSearchFlowService);
  protected readonly filter = toSignal(this.data.filter$, { requireSync: true });
  protected readonly technologyOptions = toSignal(this.data.technologyFilterData$, { initialValue: [] });
  protected readonly providerOptions = toSignal(this.data.providerFilterData$, { initialValue: [] });
  protected readonly spatialSearchItems = this.store.selectSignal(SpatialSearchFilterSelectors.items);
  protected readonly databaseReady = this.store.selectSignal(DataStateSelectors.isDatabaseReady);
  protected readonly cellTypeTree = this.store.selectSignal(DataStateSelectors.cellTypesTreeModel);
  protected readonly ontologyTree = this.store.selectSignal(DataStateSelectors.anatomicalStructuresTreeModel);
  protected readonly biomarkerTree = this.store.selectSignal(DataStateSelectors.biomarkersTreeModel);

  protected readonly ageRangeValue = computed(() =>
    this.formatRange(this.filter().ageRange, DEFAULT_FILTER_AGE_LOW, DEFAULT_FILTER_AGE_HIGH),
  );
  protected readonly bmiRangeValue = computed(() =>
    this.formatRange(this.filter().bmiRange, DEFAULT_FILTER_BMI_LOW, DEFAULT_FILTER_BMI_HIGH),
  );

  readonly header$ = this.globalConfig.getOption('header');
  readonly homeUrl$ = this.globalConfig.getOption('homeUrl');
  readonly logoTooltip$ = this.globalConfig.getOption('logoTooltip');
  readonly loginDisabled$ = this.globalConfig.getOption('loginDisabled');
  readonly filter$ = this.globalConfig.getOption('filter');
  readonly selectedOrgans$ = this.globalConfig.getOption('selectedOrgans');
  readonly baseHref$ = this.globalConfig.getOption('baseHref');

  /**
   * Creates an instance of app component.
   *
   * @param data The data state.
   */
  constructor(
    readonly scene: SceneState,
    readonly listResultsState: ListResultsState,
    readonly consentService: ConsentService,
    readonly localStorageSyncService: LocalStorageSyncService,
    readonly snackbar: MatSnackBar,
    private readonly globalConfig: GlobalConfigState<AppOptions>,
  ) {
    this.data.tissueBlockData$.subscribe();
    this.data.aggregateData$.subscribe();
    this.data.ontologyTermOccurencesData$.subscribe();
    this.data.cellTypeTermOccurencesData$.subscribe();
    this.data.biomarkerTermOccurencesData$.subscribe();
    this.data.sceneData$.subscribe();
    this.filter$.subscribe((filter = {}) => this.data.updateFilter(filter));
    this.baseHref$.subscribe((ref) => this.globalConfig.patchState({ baseHref: ref ?? '' }));

    combineLatest([scene.referenceOrgans$, this.selectedOrgans$]).subscribe(([refOrgans, selected]) => {
      scene.setSelectedReferenceOrgansWithDefaults(refOrgans as OrganInfo[], selected ?? []);
    });

    this.selectedtoggleOptions = this.menuOptions;
  }

  ngOnInit(): void {
    const snackBar = this.snackbar.openFromComponent(TrackingPopupComponent, {
      data: {
        preClose: () => {
          snackBar.dismiss();
        },
      },
      panelClass: 'usage-snackbar',
      duration: this.consentService.consent === 'not-set' ? Infinity : 6000,
    });
  }

  resetView(bodyUI: BodyUiComponent): void {
    bodyUI.target = [0, 0, 0];
    bodyUI.rotation = 0;
    bodyUI.rotationX = 0;
    bodyUI.bounds = { x: 2.2, y: 2, z: 0.4 };
  }

  formatRange(range: number[] | undefined, min: number, max: number): string {
    return `${range?.[0] ?? min}-${range?.[1] ?? max}`;
  }

  /**
   * Captures changes in the ontologySelection and uses them to update the results-browser label
   * and the filter object in the data store.
   *
   * @param ontologySelection the list of currently selected organ nodes
   */
  ontologySelected(
    ontologySelection: OntologySelection[] | undefined,
    type: 'anatomical-structures' | 'cell-type' | 'biomarkers',
  ): void {
    if (ontologySelection) {
      if (type === 'anatomical-structures') {
        this.data.updateFilter({ ontologyTerms: ontologySelection.map((selection) => selection.id) });
      } else if (type === 'cell-type') {
        this.data.updateFilter({ cellTypeTerms: ontologySelection.map((selection) => selection.id) });
      } else if (type === 'biomarkers') {
        this.data.updateFilter({ biomarkerTerms: ontologySelection.map((selection) => selection.id) });
      }
      return;
    }

    this.data.updateFilter({ ontologyTerms: [], cellTypeTerms: [], biomarkerTerms: [] });
  }

  isItemSelected(item: string) {
    return this.selectedtoggleOptions.includes(item);
  }

  toggleSelection(value: string[]) {
    this.selectedtoggleOptions = value;
  }

  asMutable<T>(value: Immutable<T>): T {
    return value as T;
  }

  selectAllOrgans() {
    this.scene.setSelectedReferenceOrgans(ALL_ORGANS);
  }

  clearAllOrgans() {
    this.scene.setSelectedReferenceOrgans([]);
  }
}
