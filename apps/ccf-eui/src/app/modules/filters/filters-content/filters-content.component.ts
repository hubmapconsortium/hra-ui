import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SpatialSearch } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SpatialSearchListComponent } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { DEFAULT_FILTER } from '../../../core/store/data/data.state';
import { SpatialSearchFilterItem } from '../../../core/store/spatial-search-filter/spatial-search-filter.state';
import { SpatialSearchSex } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { AutocompleteChipsFormComponent } from '../autocomplete-chip-form/autocomplete-chips-form.component';
import { DualSliderComponent } from '../dual-slider/dual-slider.component';
import { SpatialSearchFlowService } from '../../../shared/services/spatial-search-flow.service';

/** Sex can be male, female or both */
export type Sex = 'Male' | 'Female' | 'Both';

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
    SpatialSearchListComponent,
    MatFormFieldModule,
    MatSelectModule,
    ButtonsModule,
    ScrollingModule,
    DualSliderComponent,
    AutocompleteChipsFormComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' } satisfies MatFormFieldDefaultOptions,
    },
  ],
})
export class FiltersContentComponent implements OnChanges, OnInit {
  /**
   * Determines if the filters are visible
   */
  readonly hidden = input<boolean>();

  /**
   * Allows the filters to be set from outside the component
   */
  readonly filters = input<Record<string, unknown>>();

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
    sex: new FormControl<Sex>('Both', Validators.required),
    ageRange: new FormControl<number[]>([], Validators.required),
    bmiRange: new FormControl<number[]>([], Validators.required),
    technologies: new FormControl<string[]>([]),
    consortia: new FormControl<string[]>([]),
    providers: new FormControl<string[]>([]),
    spatialSearches: new FormControl<SpatialSearch[]>([]),
  });

  readonly spatialFlowService = inject(SpatialSearchFlowService);

  enableReset = false;

  enableApply = false;

  justReset = false;

  /**
   * Creates an instance of filters content component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) {}

  ngOnInit(): void {
    const f = this.filters();
    if (f) {
      this.filterForm.patchValue({
        sex: f['sex'] as Sex,
        ageRange: f['ageRange'] as number[],
        bmiRange: f['bmiRange'] as number[],
      });
    }
  }

  /**
   * Handle input changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      'spatialSearchFilters' in changes &&
      !changes['spatialSearchFilters'].isFirstChange() &&
      changes['spatialSearchFilters'].currentValue.toString() !==
        changes['spatialSearchFilters'].previousValue.toString()
    ) {
      this.updateSexFromSelection(this.spatialSearchFilters().filter((item) => item.selected));
      if (this.spatialSearchFilters().length > 0) {
        this.enableReset = true;
        this.enableApply = true;
      }
    }
  }

  /**
   * Updates the filter object with a new key/value
   *
   * @param value The value to be saved for the filter
   * @param key The key for the filter to be saved at
   */
  updateFilter(value: unknown, key: string): void {
    const currentValue = this.filterForm.value[key as keyof typeof this.filterForm.value]?.toString();
    if (currentValue !== value?.toString()) {
      this.enableReset = true;
      this.enableApply = true;
      this.filterForm.patchValue({
        [key]: value,
      });
      this.ga.event('filter_update', 'filter_content', `${key}:${value}`);
    }
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
    this.enableApply = false;
    this.enableReset = !this.justReset;
    this.justReset = false;
  }

  /**
   * Refreshes all filter settings
   */
  refreshFilters(): void {
    const defaults = {
      ...DEFAULT_FILTER,
      providers: DEFAULT_FILTER['tmc'],
      consortia: DEFAULT_FILTER['consortiums'],
    };

    for (const search of this.spatialSearchFilters()) {
      this.spatialSearchRemoved.emit(search.id);
    }

    this.updateSearchSelection([]);
    this.filterForm.patchValue(defaults);

    this.ga.event('filters_reset', 'filter_content');
    this.enableReset = false;
    this.justReset = true;
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
    const currentSex = this.filterForm.controls.sex.value?.toLowerCase() as SpatialSearchSex;
    const selectedSexes = new Set(items.map((item) => item.sex));

    if (selectedSexes.size > 1 && !selectedSexes.has(currentSex)) {
      this.updateFilter('Both', 'sex');
    }
  }
}
