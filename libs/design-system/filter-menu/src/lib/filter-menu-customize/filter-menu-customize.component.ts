import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { FilterOptionCategory, FilterToggleOption } from '../filter-menu.component';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Filter menu controls
 */
@Component({
  selector: 'hra-filter-menu-customize',
  imports: [
    HraCommonModule,
    ButtonsModule,
    IconsModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
  ],
  templateUrl: './filter-menu-customize.component.html',
  styleUrl: './filter-menu-customize.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuCustomizeComponent {
  /** Filters to display in filter section */
  readonly filters = input.required<FilterOptionCategory[]>();
  /** Button toggle options */
  readonly toggleOptions = input<FilterToggleOption[]>();
  /** Sets how to view the database */
  readonly viewAsOptions = input<FilterToggleOption[]>();
  /** Sets sort mode */
  readonly sortByOptions = input.required<FilterToggleOption[]>();

  /** Form for the filter menu */
  readonly form = computed(() => {
    return new FormGroup({
      toggle: new FormControl<FilterToggleOption | null>(null),
      viewAs: new FormControl<FilterToggleOption | null>(null),
      sortBy: new FormControl<FilterToggleOption | null>(null),
      groupBy: new FormControl<FilterToggleOption | null>(null),
    });
  });

  /** Emits when the form changes */
  readonly formChange = output<FormGroup>();
  /** Emits when a filter category overlay is opened */
  readonly openFilterOverlay = output<FilterOptionCategory>();

  /** Constructor; sets first button toggle category as initial value */
  constructor() {
    effect(() => {
      const toggleCategories = this.toggleOptions();
      if (toggleCategories && toggleCategories.length > 0) {
        this.form().patchValue({ toggle: toggleCategories[0] });
      }
    });
  }

  /**
   * Button toggle selection
   * @param event Option selected
   * @param controlName Name of button toggle control
   */
  toggleSelect(event: FilterToggleOption, controlName: 'viewAs' | 'sortBy' | 'groupBy'): void {
    this.form().patchValue({ [controlName]: event });
    this.formChange.emit(this.form());
  }
}
