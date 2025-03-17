import { ChangeDetectionStrategy, Component, computed, effect, inject, input, model, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Filter, FilterSexEnum } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SpatialSearchListComponent } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import {
  DEFAULT_FILTER,
  DEFAULT_FILTER_AGE_HIGH,
  DEFAULT_FILTER_AGE_LOW,
  DEFAULT_FILTER_BMI_HIGH,
  DEFAULT_FILTER_BMI_LOW,
  DEFAULT_FILTER_SEX,
  isFilterEmpty,
  normalizeFilter,
} from '../../../core/store/data/data.state';
import { SpatialSearchFilterItem } from '../../../core/store/spatial-search-filter/spatial-search-filter.state';
import { SpatialSearchFlowService } from '../../../shared/services/spatial-search-flow.service';
import { AutocompleteChipsFormComponent } from '../autocomplete-chip-form/autocomplete-chips-form.component';
import { DualSliderComponent } from '../dual-slider/dual-slider.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' } satisfies MatFormFieldDefaultOptions,
    },
  ],
})
export class FiltersContentComponent {
  readonly filter = model.required<Filter>();

  readonly technologyOptions = input.required<string[]>();
  readonly providerOptions = input.required<string[]>();
  readonly consortiaOptions = input(['HuBMAP', 'SenNet']);

  readonly spatialSearchItems = input.required<SpatialSearchFilterItem[]>();
  readonly spatialSearchSelectionChange = output<SpatialSearchFilterItem[]>();
  readonly spatialSearchRemoved = output<string>();

  protected readonly ageMin = DEFAULT_FILTER_AGE_LOW;
  protected readonly ageMax = DEFAULT_FILTER_AGE_HIGH;
  protected readonly bmiMin = DEFAULT_FILTER_BMI_LOW;
  protected readonly bmiMax = DEFAULT_FILTER_BMI_HIGH;
  protected readonly sexOptions = [FilterSexEnum.Both, FilterSexEnum.Female, FilterSexEnum.Male];

  private readonly ga = inject(GoogleAnalyticsService);
  protected readonly spatialFlowService = inject(SpatialSearchFlowService);

  private readonly nnfb = inject(NonNullableFormBuilder);
  protected filterForm = this.nnfb.group({
    sex: [DEFAULT_FILTER_SEX],
    ageRange: [[DEFAULT_FILTER_AGE_LOW, DEFAULT_FILTER_AGE_HIGH]],
    bmiRange: [[DEFAULT_FILTER_BMI_LOW, DEFAULT_FILTER_BMI_HIGH]],
    technologies: [[] as string[]],
    consortiums: [[] as string[]],
    tmc: [[] as string[]],
  });

  private readonly formValue = toSignal(this.filterForm.valueChanges, { initialValue: DEFAULT_FILTER });
  private readonly selectedSpatialSearchItems = computed(() =>
    this.spatialSearchItems().filter((item) => item.selected),
  );
  private readonly selectedSpatialSearchSexes = computed(() =>
    this.selectedSpatialSearchItems().map((item) => item.sex),
  );
  private readonly selectedSpatialSearches = computed(() =>
    this.selectedSpatialSearchItems().map((item) => item.search),
  );
  protected readonly isEmpty = computed(
    () => isFilterEmpty(this.formValue()) && this.spatialSearchItems().length === 0,
  );

  constructor() {
    effect(() => {
      const filter = normalizeFilter(this.filter());
      this.filterForm.patchValue(filter);
      this.filterForm.markAsPristine();
    });

    effect(() => {
      const currentSex = this.filterForm.controls.sex.value;
      if (this.isSexOptionDisabled(currentSex)) {
        this.filterForm.patchValue({ sex: FilterSexEnum.Both });
      }
    });
  }

  applyFilter(): void {
    this.ga.event('filters_applied', 'filter_content');
    this.filter.set({
      ...this.filterForm.value,
      spatialSearches: this.selectedSpatialSearches(),
    });
  }

  resetFilter(): void {
    this.ga.event('filters_reset', 'filter_content');
    this.filterForm.patchValue(DEFAULT_FILTER);
    this.filterForm.markAsDirty();
    this.spatialSearchItems().forEach((item) => this.spatialSearchRemoved.emit(item.id));
    this.spatialSearchSelectionChange.emit([]);
  }

  isSexOptionDisabled(option: FilterSexEnum): boolean {
    const selectedSexes = this.selectedSpatialSearchSexes();
    return option !== FilterSexEnum.Both && selectedSexes.length !== 0 && !selectedSexes.includes(option);
  }
}
