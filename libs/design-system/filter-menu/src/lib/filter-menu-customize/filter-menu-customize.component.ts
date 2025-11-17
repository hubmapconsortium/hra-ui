import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { FilterMenuOption } from '../filter-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { FilterContainerComponent } from '@hra-ui/design-system/filter-container';

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
    FilterContainerComponent,
  ],
  templateUrl: './filter-menu-customize.component.html',
  styleUrl: './filter-menu-customize.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuCustomizeComponent {
  /** Filters to display in filter section */
  readonly filters = input.required<FilterMenuOption[]>();
  /** Button toggle options */
  readonly toggleOptions = input<FilterMenuOption[]>();
  /** Sets how to view the database */
  readonly viewAsOptions = input<FilterMenuOption[]>();
  /** Sets sort mode */
  readonly sortByOptions = input.required<FilterMenuOption[]>();

  /** Form group for filter category options */
  readonly filterCategories = computed(() => {
    const result: Record<string, FormControl<FilterMenuOption[] | null>> = {};
    for (const category of this.filters()) {
      result[category.id] = new FormControl<FilterMenuOption[]>([]);
    }
    return result;
  });

  /** Form for the filter menu */
  readonly form = computed(() => {
    return new FormGroup({
      customize: new FormGroup({
        toggle: new FormControl<FilterMenuOption | null>(null),
        viewAs: new FormControl<FilterMenuOption | null>(null),
        sortBy: new FormControl<FilterMenuOption | null>(null),
        groupBy: new FormControl<FilterMenuOption | null>(null),
      }),
      filters: new FormGroup(this.filterCategories()),
    });
  });

  /** Emits when the form changes */
  readonly formChange = output<FormGroup>();
  /** Emits when a filter category overlay is opened */
  readonly openFilterOverlay = output<FilterMenuOption>();

  /** Constructor; sets first button toggle category as initial value */
  constructor() {
    effect(() => {
      const toggleCategories = this.toggleOptions();
      if (toggleCategories && toggleCategories.length > 0) {
        this.form().controls.customize.patchValue({ toggle: toggleCategories[0] });
      }
    });
  }

  /**
   * Button toggle selection
   * @param event Option selected
   * @param controlName Name of button toggle control
   */
  toggleSelect(event: FilterMenuOption, controlName: 'viewAs' | 'sortBy' | 'groupBy'): void {
    this.form().controls.customize.patchValue({ [controlName]: event });
    this.formChange.emit(this.form());
  }
}
