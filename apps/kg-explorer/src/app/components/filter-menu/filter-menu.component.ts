import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';

import { FilterOption, FilterOptionCategory } from '../../pages/main-page/main-page.component';
import { FilterMenuOverlayComponent } from './filter-menu-overlay/filter-menu-overlay.component';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

/** Filter form controls */
export interface FilterFormControls {
  digitalObjects: FormControl<FilterOption[] | null>;
  releaseVersion: FormControl<FilterOption[] | null>;
  organs: FormControl<FilterOption[] | null>;
  anatomicalStructures: FormControl<FilterOption[] | null>;
  cellTypes: FormControl<FilterOption[] | null>;
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
  ],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.closed]': 'formClosed()',
  },
})
export class FilterMenuComponent {
  private readonly nnfb = inject(NonNullableFormBuilder);
  protected readonly form = this.nnfb.group({
    digitalObjects: new FormControl<FilterOption[] | null>(null),
    releaseVersion: new FormControl<FilterOption[] | null>(null),
    organs: new FormControl<FilterOption[] | null>(null),
    anatomicalStructures: new FormControl<FilterOption[] | null>(null),
    cellTypes: new FormControl<FilterOption[] | null>(null),
    biomarkers: new FormControl<FilterOption[] | null>(null),
  });

  readonly filterOptions = input.required<FilterOptionCategory[]>();
  readonly formClosed = input(false);
  readonly drawerClosed = signal<boolean>(false);
  readonly toggleForm = output();

  readonly formChanges = output<FilterFormControls>();

  toggleDrawer() {
    // this.drawerClosed.set(!this.drawerClosed());
    this.toggleForm.emit();
  }

  handleFilterChange() {
    this.formChanges.emit(this.form.controls);
  }
}
