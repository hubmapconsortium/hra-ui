import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Input,
  model,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from '@hra-ui/design-system/button';
import { SpatialSearchListModule } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { DEFAULT_FILTER } from '../../../core/store/data/data.state';
import { SpatialSearchFilterItem } from '../../../core/store/spatial-search-filter/spatial-search-filter.state';
import { DualSliderComponent } from '../../../shared/components/dual-slider/dual-slider.component';
import { RunSpatialSearchModule } from '../../../shared/components/run-spatial-search/run-spatial-search.module';
import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';

/**
 * Contains components of the filters popup and handles changes in filter settings
 */
@Component({
  selector: 'ccf-filters-content',
  templateUrl: './filters-content.component.html',
  styleUrls: ['./filters-content.component.scss'],
  imports: [
    ButtonModule,
    MatIconModule,
    SpatialSearchListModule,
    RunSpatialSearchModule,
    MatFormFieldModule,
    MatSelectModule,
    DualSliderComponent,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersContentComponent implements OnChanges {
  /**
   * Determines if the filters are visible
   */
  @Input() hidden!: boolean;

  /**
   * Allows the filters to be set from outside the component
   */
  @Input() filters?: Record<string, unknown | unknown[]>;

  /**
   * List of technologies in the data
   */
  // @Input() technologyFilters!: string[];
  // readonly technologyFilters = input.required<string[]>();

  /**
   * List of providers in the data
   */
  @Input() providerFilters!: string[];

  /**
   * List of spatial searches
   */
  @Input() spatialSearchFilters: SpatialSearchFilterItem[] = [];

  /**
   * Emits the filter change when they happen
   */
  @Output() readonly filtersChange = new EventEmitter<Record<string, unknown>>();

  /**
   * Emits when a spatial search is selected/deselected
   */
  @Output() readonly spatialSearchSelected = new EventEmitter<SpatialSearchFilterItem[]>();

  /**
   * Emits when a spatial search is removed/deleted
   */
  @Output() readonly spatialSearchRemoved = new EventEmitter<string>();

  /**
   * Emits the filters to be applied
   */
  @Output() readonly applyFilters = new EventEmitter<Record<string, unknown>>();

  get sex(): Sex {
    return this.getFilterValue<string>('sex', 'male')?.toLowerCase() as Sex;
  }

  get ageRange(): number[] {
    return this.getFilterValue<number[]>('ageRange', []);
  }

  get bmiRange(): number[] {
    return this.getFilterValue<number[]>('bmiRange', []);
  }

  get technologies(): string[] {
    return this.getFilterValue<string[]>('technologies', []);
  }

  get tmc(): string[] {
    return this.getFilterValue<string[]>('tmc', []);
  }

  /**
   * Creates an instance of filters content component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) {}

  /**
   * Handle input changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('spatialSearchFilters' in changes) {
      this.updateSexFromSelection(this.spatialSearchFilters.filter((item) => item.selected));
    }
  }

  /**
   * Updates the filter object with a new key/value
   *
   * @param value The value to be saved for the filter
   * @param key The key for the filter to be saved at
   */
  updateFilter(value: unknown, key: string): void {
    this.filters = { ...this.filters, [key]: value };
    this.ga.event('filter_update', 'filter_content', `${key}:${value}`);
    this.filtersChange.emit(this.filters);
  }

  /**
   * Emits the current filters when the apply button is clicked
   */
  applyButtonClick(): void {
    this.updateSearchSelection(this.spatialSearchFilters.filter((item) => item.selected));
    this.ga.event('filters_applied', 'filter_content');
    this.applyFilters.emit(this.filters);
  }

  /**
   * Refreshes all filter settings
   */
  refreshFilters(): void {
    this.filters = JSON.parse(JSON.stringify(DEFAULT_FILTER));
    this.ga.event('filters_reset', 'filter_content');
    this.spatialSearchSelected.emit([]);
    this.filtersChange.emit(this.filters);
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
    const currentSex = this.sex;
    const selectedSexes = new Set(items.map((item) => item.sex));

    if (items.length > 0 && (selectedSexes.size > 1 || !selectedSexes.has(currentSex))) {
      this.updateFilter('Both', 'sex');
    }
  }

  private getFilterValue<T>(key: string, defaultValue: T): T {
    return (this.filters?.[key] as T | undefined) ?? defaultValue;
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentAssay = model('');
  readonly assays = signal([] as string[]);
  readonly technologyFilters = input.required<string[]>();
  readonly filteredAssays = computed(() => {
    const currentAssay = this.currentAssay().toLowerCase();
    return currentAssay
      ? this.technologyFilters().filter((assay) => assay.toLowerCase().includes(currentAssay))
      : this.technologyFilters().slice();
  });

  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our assay
    if (value) {
      this.assays.update((assay) => [...assay, value]);
    }

    // Clear the input value
    this.currentAssay.set('');
  }

  remove(assay: string): void {
    this.assays.update((assays) => {
      const index = assays.indexOf(assay);
      if (index < 0) {
        return assays;
      }

      assays.splice(index, 1);
      this.announcer.announce(`Removed ${assay}`);
      return [...assays];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.assays.update((assays) => [...assays, event.option.viewValue]);
    this.currentAssay.set('');
    event.option.deselect();
  }
}
