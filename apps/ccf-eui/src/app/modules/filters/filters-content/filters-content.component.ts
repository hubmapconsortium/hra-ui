import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  input,
  model,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SpatialSearch } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { SpatialSearchListModule } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { DEFAULT_FILTER } from '../../../core/store/data/data.state';
import { SpatialSearchFilterItem } from '../../../core/store/spatial-search-filter/spatial-search-filter.state';
import { DualSliderComponent } from '../../../shared/components/dual-slider/dual-slider.component';
import { RunSpatialSearchModule } from '../../../shared/components/run-spatial-search/run-spatial-search.module';
import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';

const DEFAULT_CONSORTIA = ['HuBMAP', 'SenNet'];

/**
 * Contains components of the filters popup and handles changes in filter settings
 */
@Component({
  selector: 'ccf-filters-content',
  templateUrl: './filters-content.component.html',
  styleUrls: ['./filters-content.component.scss'],
  imports: [
    ReactiveFormsModule,
    ButtonsModule,
    MatIconModule,
    SpatialSearchListModule,
    RunSpatialSearchModule,
    MatFormFieldModule,
    MatSelectModule,
    DualSliderComponent,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,
    ButtonsModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersContentComponent implements OnChanges, OnInit {
  /**
   * Determines if the filters are visible
   */
  readonly hidden = input<boolean>();

  /**
   * Allows the filters to be set from outside the component
   */
  @Input() filters?: Record<string, unknown>;

  /**
   * List of technologies in the data
   */
  readonly technologyFilters = input.required<string[]>();

  /**
   * List of providers in the data
   */
  readonly providerFilters = input.required<string[]>();

  /**
   * List of spatial searches
   */
  readonly spatialSearchFilters = input.required<SpatialSearchFilterItem[]>();

  /**
   * Emits the filter change when they happen
   */
  filtersChange = output<Record<string, unknown>>();

  /**
   * Emits when a spatial search is selected/deselected
   */
  spatialSearchSelected = output<SpatialSearchFilterItem[]>();

  /**
   * Emits when a spatial search is removed/deleted
   */
  spatialSearchRemoved = output<string>();

  /**
   * Emits the filters to be applied
   */
  applyFilters = output<Record<string, unknown>>();

  private readonly nnfb = inject(NonNullableFormBuilder);
  protected filterForm = this.nnfb.group({
    sex: new FormControl<Sex | null>(null),
    ageRange: new FormControl<number[] | null>(null),
    bmiRange: new FormControl<number[] | null>(null),
    technologies: new FormControl<string[] | null>(null),
    consortia: new FormControl<string[] | null>(null),
    providers: new FormControl<string[] | null>(null),
    spatialSearches: new FormControl<SpatialSearch[] | null>(null),
  });

  /**
   * Creates an instance of filters content component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) {}

  ngOnInit(): void {
    if (this.filters) {
      this.filterForm.patchValue({
        sex: this.filters['sex'] as Sex,
        ageRange: this.filters['ageRange'] as number[],
        bmiRange: this.filters['bmiRange'] as number[],
      });
    }
  }

  /**
   * Handle input changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('spatialSearchFilters' in changes) {
      this.updateSexFromSelection(this.spatialSearchFilters().filter((item) => item.selected));
    }
  }

  /**
   * Updates the filter object with a new key/value
   *
   * @param value The value to be saved for the filter
   * @param key The key for the filter to be saved at
   */
  updateFilter(value: unknown, key: string): void {
    this.filterForm.patchValue({
      [key]: value,
    });
    this.ga.event('filter_update', 'filter_content', `${key}:${value}`);
    this.filtersChange.emit(this.convertedFilter());
  }

  convertedFilter(): Record<string, unknown> {
    const { sex, ageRange, bmiRange, technologies, consortia, providers, spatialSearches } = this.filterForm.controls;

    return {
      sex: sex.value,
      ageRange: ageRange.value,
      bmiRange: bmiRange.value,
      technologies: technologies.value,
      consortiums: consortia.value,
      tmc: providers.value,
      spatialSearches: spatialSearches.value,
    } as Record<string, unknown>;
  }

  /**
   * Emits the current filters when the apply button is clicked
   */
  applyButtonClick(): void {
    this.updateSearchSelection(this.spatialSearchFilters().filter((item) => item.selected));
    this.ga.event('filters_applied', 'filter_content');
    this.applyFilters.emit(this.convertedFilter());
  }

  /**
   * Refreshes all filter settings
   */
  refreshFilters(): void {
    this.assays.set([]);
    this.providers.set([]);
    this.filters = JSON.parse(JSON.stringify(DEFAULT_FILTER));
    if (this.filters) {
      this.filterForm.patchValue({
        sex: this.filters['sex'] as Sex,
        ageRange: this.filters['ageRange'] as number[],
        bmiRange: this.filters['bmiRange'] as number[],
        consortia: this.filters['consortiums'] as string[],
        technologies: this.filters['technologies'] as string[],
        providers: this.filters['tmc'] as string[],
        spatialSearches: this.filters['spatialSearches'] as SpatialSearch[],
      });
    }
    this.ga.event('filters_reset', 'filter_content');
    this.spatialSearchSelected.emit([]);
    this.filtersChange.emit(this.filters ?? {});
  }

  /**
   * Emits events for updated searches
   *
   * @param items New set of selected items
   */
  updateSearchSelection(items: SpatialSearchFilterItem[]): void {
    const searches = items.map((item) => item.search);

    this.spatialSearchSelected.emit(items);
    this.updateFilter(searches, 'spatialSearches');
    this.updateSexFromSelection(items);
  }

  /**
   * Updates sex to `Both` if there is a mismatch between the current selection and the sex
   */
  updateSexFromSelection(items: SpatialSearchFilterItem[]): void {
    const currentSex = this.filterForm.controls.sex.value?.toLowerCase() as Sex;
    const selectedSexes = new Set(items.map((item) => item.sex));

    if (items.length > 0 && (selectedSexes.size > 1 || !selectedSexes.has(currentSex))) {
      this.updateFilter('Both', 'sex');
    }
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  readonly currentAssay = model('');
  readonly assays = signal([] as string[]);
  readonly filteredAssays = computed(() => {
    const currentAssay = this.currentAssay().toLowerCase();
    return currentAssay
      ? this.technologyFilters().filter((assay) => assay.toLowerCase().includes(currentAssay))
      : this.technologyFilters().slice();
  });

  readonly currentProvider = model('');
  readonly providers = signal([] as string[]);
  readonly filteredProviders = computed(() => {
    const currentProvider = this.currentProvider().toLowerCase();
    return currentProvider
      ? this.providerFilters().filter((provider) => provider.toLowerCase().includes(currentProvider))
      : this.providerFilters().slice();
  });

  readonly currentConsortium = model('');
  readonly consortia = signal([] as string[]);
  readonly filteredConsortia = computed(() => {
    const currentConsortium = this.currentConsortium().toLowerCase();
    return currentConsortium
      ? DEFAULT_CONSORTIA.filter((consortium) => consortium.toLowerCase().includes(currentConsortium))
      : DEFAULT_CONSORTIA.slice();
  });

  add(event: MatChipInputEvent, field: string): void {
    const value = (event.value || '').trim();

    switch (field) {
      case 'technologies':
        if (value) {
          this.assays.update((assay) => [...assay, value]);
        }
        this.currentAssay.set('');
        break;
      case 'providers':
        if (value) {
          this.providers.update((provider) => [...provider, value]);
        }
        this.currentProvider.set('');
        break;
      case 'consortia':
        if (value) {
          this.consortia.update((consortium) => [...consortium, value]);
        }
        this.currentConsortium.set('');
        break;
      default:
        break;
    }
  }

  remove(assay: string, field: string): void {
    switch (field) {
      case 'technologies':
        this.assays.update((assays) => {
          const index = assays.indexOf(assay);
          if (index < 0) {
            return assays;
          }

          assays.splice(index, 1);
          return [...assays];
        });
        break;
      case 'providers':
        this.providers.update((providers) => {
          const index = providers.indexOf(assay);
          if (index < 0) {
            return providers;
          }

          providers.splice(index, 1);
          return [...providers];
        });
        break;
      case 'consortia':
        this.consortia.update((consortia) => {
          const index = consortia.indexOf(assay);
          if (index < 0) {
            return consortia;
          }

          consortia.splice(index, 1);
          return [...consortia];
        });
        break;
      default:
        break;
    }
  }

  selected(event: MatAutocompleteSelectedEvent, field: string): void {
    switch (field) {
      case 'technologies':
        this.assays.update((assays) => [...assays, event.option.viewValue]);
        this.currentAssay.set('');
        event.option.deselect();
        break;
      case 'providers':
        this.providers.update((providers) => [...providers, event.option.viewValue]);
        this.currentProvider.set('');
        event.option.deselect();
        break;
      case 'consortia':
        this.consortia.update((consortia) => [...consortia, event.option.viewValue]);
        this.currentConsortium.set('');
        event.option.deselect();
        break;
      default:
        break;
    }
  }
}
