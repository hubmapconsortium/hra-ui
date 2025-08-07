import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

import { CurrentFilters, FilterOption, FilterOptionCategory } from '../../pages/main-page/main-page.component';
import { FilterMenuOverlayComponent } from './filter-menu-overlay/filter-menu-overlay.component';

/** Filter form controls */
export interface FilterFormControls {
  /** Digital object form control */
  digitalObjects: FormControl<FilterOption[] | null>;
  /** Release version form control */
  releaseVersion: FormControl<FilterOption[] | null>;
  /** Organs form control */
  organs: FormControl<FilterOption[] | null>;
  /** Anatomical structures form control */
  anatomicalStructures: FormControl<FilterOption[] | null>;
  /** Cell types form control */
  cellTypes: FormControl<FilterOption[] | null>;
  /** Biomarkers form control */
  biomarkers: FormControl<FilterOption[] | null>;
}

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
  /** Form builder service */
  private readonly fb = inject(FormBuilder);

  /** Filter form group */
  protected readonly form = this.fb.group({
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
  readonly currentFilters = input<CurrentFilters>();

  /** Emits when the form opening state is toggled */
  readonly toggleForm = output();
  /** Emits form controls */
  readonly formChanges = output<FilterFormControls>();

  /** Emits the form controls on filter change */
  handleFilterChange() {
    this.formChanges.emit(this.form.controls);
  }
}
