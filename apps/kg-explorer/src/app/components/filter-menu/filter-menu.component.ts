import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

import { CurrentFilters } from '../../pages/main-page/main-page.component';
import { FilterOption, FilterOptionCategory } from '../../utils/utils';
import { FilterMenuOverlayComponent } from './filter-menu-overlay/filter-menu-overlay.component';

/** Filter form values */
export interface FilterFormValues {
  /** Digital object form control */
  digitalObjects: FilterOption[] | null;
  /** Release version form control */
  releaseVersion: FilterOption[] | null;
  /** Organs form control */
  organs: FilterOption[] | null;
  /** Anatomical structures form control */
  anatomicalStructures: FilterOption[] | null;
  /** Cell types form control */
  cellTypes: FilterOption[] | null;
  /** Biomarkers form control */
  biomarkers: FilterOption[] | null;
}

/** Filter types for the filter form */
type FilterType = 'digitalObjects' | 'releaseVersion' | 'organs' | 'anatomicalStructures' | 'cellTypes' | 'biomarkers';

/**
 * Filter menu for the KG Explorer
 */
@Component({
  selector: 'hra-filter-menu',
  imports: [
    HraCommonModule,
    ButtonsModule,
    IconsModule,
    MatDividerModule,
    FilterMenuOverlayComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    ScrollingModule,
    PlainTooltipDirective,
  ],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.closed]': 'formClosed()',
  },
})
export class FilterMenuComponent {
  /** Filter form group */
  protected readonly form = new FormGroup({
    digitalObjects: new FormControl<FilterOption[] | null>(null),
    releaseVersion: new FormControl<FilterOption[] | null>(null),
    organs: new FormControl<FilterOption[] | null>(null),
    anatomicalStructures: new FormControl<FilterOption[] | null>(null),
    cellTypes: new FormControl<FilterOption[] | null>(null),
    biomarkers: new FormControl<FilterOption[] | null>(null),
  });

  /** All filter categories */
  readonly filterCategories = input.required<FilterOptionCategory[]>();
  /** Whether or not the form panel is closed */
  readonly formClosed = input(false);
  /** Contains current selected filter IDs */
  readonly currentFilters = input.required<CurrentFilters>();

  /** Key value pairs for the filter form group */
  readonly formValues = computed<[FilterType, FormControl<FilterOption[] | null>][]>(() => [
    ['digitalObjects', this.form.controls.digitalObjects],
    ['releaseVersion', this.form.controls.releaseVersion],
    ['organs', this.form.controls.organs],
    ['anatomicalStructures', this.form.controls.anatomicalStructures],
    ['cellTypes', this.form.controls.cellTypes],
    ['biomarkers', this.form.controls.biomarkers],
  ]);

  /** Emits when the form opening state is toggled */
  readonly toggleForm = output();
  /** Emits form controls */
  readonly formChanges = output<FilterFormValues>();

  /** Emits the form controls on filter change */
  handleFilterChange() {
    this.formChanges.emit(this.form.value as FilterFormValues);
  }
}
