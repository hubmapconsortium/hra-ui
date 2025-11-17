import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { Option } from '../filter-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionSelectionChange } from '@angular/material/core';

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
  readonly filters = input.required<Option[]>();
  readonly toggleOptions = input<Option[]>();
  readonly viewAsOptions = input<Option[]>();
  readonly sortByOptions = input.required<Option[]>();
  readonly groupByOptions = input.required<Option[]>();

  readonly filterCategories = computed(() => {
    const result: Record<string, FormControl<Option[] | null>> = {};
    for (const category of this.filters()) {
      result[category.id] = new FormControl<Option[]>([]);
    }
    return result;
  });

  readonly form = computed(() => {
    return new FormGroup({
      customize: new FormGroup({
        toggle: new FormControl<Option | null>(null),
        viewAs: new FormControl<Option | null>(null),
        sortBy: new FormControl<Option | null>(null),
        groupBy: new FormControl<Option | null>(null),
      }),
      filters: new FormGroup(this.filterCategories()),
    });
  });

  readonly formValues = computed<[string, FormControl<Option[] | null>][]>(() =>
    this.filters().map((filter) => [filter.label, this.form().controls.filters.controls[filter.id]]),
  );

  constructor() {
    effect(() => {
      const toggleCategories = this.toggleOptions();
      if (toggleCategories && toggleCategories.length > 0) {
        this.form().controls.customize.patchValue({ toggle: toggleCategories[0] });
      }
    });
  }

  toggleSelect(event: MatOptionSelectionChange, controlName: 'viewAs' | 'sortBy' | 'groupBy') {
    this.form().controls.customize.patchValue({ [controlName]: event.source.value });
  }
}
