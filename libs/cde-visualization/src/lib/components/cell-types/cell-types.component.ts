import { SelectionModel } from '@angular/cdk/collections';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, model, output, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColorPickerModule } from 'ngx-color-picker';
import { map } from 'rxjs';
import { CellTypeEntry } from '../../models/cell-type';
import { Rgb } from '../../models/color';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';
import { ColorPickerLabelComponent } from '../color-picker-label/color-picker-label.component';

/**
 * Cell Type Component
 */
@Component({
  selector: 'cde-cell-types',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    ColorPickerModule,
    OverlayModule,
    ColorPickerLabelComponent,
  ],
  templateUrl: './cell-types.component.html',
  styleUrl: './cell-types.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellTypesComponent {
  readonly cellTypes = model.required<CellTypeEntry[]>();

  readonly selectedCellType = input<string>('');

  readonly download = output();

  readonly sort = viewChild.required(MatSort);

  readonly cellTypeCount = computed(() => this.cellTypes().length);

  readonly cellCount = computed(() => this.cellTypes().reduce((count, entry) => count + entry.count, 0));

  readonly displayedColumns = ['select', 'name', 'count'];

  readonly dataSource = new MatTableDataSource<CellTypeEntry>();

  readonly selectionModel = new SelectionModel<CellTypeEntry>(true, []);

  readonly selected = toSignal(this.selectionModel.changed.pipe(map(() => this.selectionModel.selected)), {
    initialValue: [],
  });

  readonly isAllSelected = computed(() => this.cellTypeCount() > 0 && this.selected().length === this.cellTypeCount());

  readonly isSomeSelected = computed(() => this.selected().length > 0 && !this.isAllSelected());

  readonly headerCheckboxLabel = computed(() => `${this.isAllSelected() ? 'deselect' : 'select'} all`);

  readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  cellTypesInfoOpen = false;

  constructor() {
    effect(() => (this.dataSource.data = this.cellTypes()));
    effect(() => (this.dataSource.sort = this.sort()));
  }

  trackByName(_index: number, item: CellTypeEntry): string {
    return item.name;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectionModel.clear();
    } else {
      this.selectionModel.select(...this.dataSource.data);
    }
  }

  checkboxLabel(row: CellTypeEntry, index: number): string {
    return `${this.selectionModel.isSelected(row) ? 'deselect' : 'select'} row ${index + 1}`;
  }

  updateColor(row: CellTypeEntry, color: Rgb): void {
    const entries = this.cellTypes();
    const index = entries.indexOf(row);
    const copy = [...entries];

    copy[index] = { ...copy[index], color };
    this.cellTypes.set(copy);
  }
}
