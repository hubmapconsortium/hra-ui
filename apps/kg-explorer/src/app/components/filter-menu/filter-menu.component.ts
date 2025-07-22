import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';

import { FilterOption, FilterOptionList } from '../../pages/main-page/main-page.component';
import { FilterMenuOverlayComponent } from './filter-menu-overlay/filter-menu-overlay.component';

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
  ],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.closed]': 'drawerClosed()',
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

  readonly filterRecord = input.required<FilterOptionList>();
  readonly drawerClosed = signal<boolean>(false);
  readonly closeDrawer = output<boolean>();

  readonly formChanges = output<FormGroup<FilterFormControls>>();

  toggleDrawer() {
    this.drawerClosed.set(!this.drawerClosed());
    this.closeDrawer.emit(this.drawerClosed());
  }

  handleFilterChange() {
    this.formChanges.emit(this.form);
  }
}
