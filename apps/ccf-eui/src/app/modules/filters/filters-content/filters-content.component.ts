import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
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
import { SpatialSearchListModule } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { DEFAULT_FILTER } from '../../../core/store/data/data.state';
import { SpatialSearchFilterItem } from '../../../core/store/spatial-search-filter/spatial-search-filter.state';
import { AutocompleteChipsFormComponent } from '../../../shared/components/autocomplete-chip-form/autocomplete-chips-form.component';
import { DualSliderComponent } from '../../../shared/components/dual-slider/dual-slider.component';
import { RunSpatialSearchModule } from '../../../shared/components/run-spatial-search/run-spatial-search.module';
import { SpatialSearchSex } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';

/** Sex can either be male or female */
export type Sex = 'male' | 'female' | 'both';

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
    sex: new FormControl<string>('both', Validators.required),
    ageRange: new FormControl<number[]>([], Validators.required),
    bmiRange: new FormControl<number[]>([], Validators.required),
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
    this.filterForm.markAsPristine();
  }

  /**
   * Refreshes all filter settings
   */
  refreshFilters(): void {
    this.filterForm.controls.technologies.patchValue([]);
    this.filterForm.controls.consortia.patchValue([]);
    this.filterForm.controls.providers.patchValue([]);
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
    this.filterForm.markAsDirty();
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

    if (items.length > 0 && (selectedSexes.size > 1 || !selectedSexes.has(currentSex as SpatialSearchSex))) {
      this.updateFilter('both', 'sex');
    }
  }
}
