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
  readonly cellTypesSelection = model.required<string[]>();

  readonly selectedCellType = input<string>('');

  readonly download = output();

  protected readonly columns = ['select', 'name', 'count'];
  protected readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  protected readonly sort = viewChild.required(MatSort);
  protected readonly sortBindRef = effect(() => (this.dataSource.sort = this.sort()));

  protected readonly dataSource = new MatTableDataSource<CellTypeEntry>();
  protected readonly dataSourceBindRef = effect(() => (this.dataSource.data = this.cellTypes()));

  protected readonly selectionModel = new SelectionModel<string>(true);
  protected readonly selectionModelBindRef = effect(
    () => this.selectionModel.setSelection(...this.cellTypesSelection()),
    { allowSignalWrites: true },
  );

  protected readonly selection$ = this.selectionModel.changed.pipe(map(() => this.selectionModel.selected));
  protected readonly selection = toSignal(this.selection$, { initialValue: [] });
  protected readonly selectionState = computed(() => {
    const cellTypesLength = this.cellTypes().length;
    const selectionLength = this.selection().length;
    if (cellTypesLength === 0 || selectionLength === 0) {
      return 'none';
    } else if (selectionLength < cellTypesLength) {
      return 'partial';
    } else {
      return 'full';
    }
  });

  protected totalCellCount = computed(() => {
    const sumCounts = (count: number, entry: CellTypeEntry) => {
      const value = this.isSelected(entry) ? entry.count : 0;
      return count + value;
    };

    // Grab dependency on current selection since selectionModel is used indirectly
    this.selection();

    return this.cellTypes().reduce(sumCounts, 0);
  });

  protected cellTypesInfoOpen = false;

  trackByName(_index: number, item: CellTypeEntry): string {
    return item.name;
  }

  getCheckboxLabel(isSelected: boolean, row?: number): string {
    const action = isSelected ? 'deselect' : 'select';
    const where = row === undefined ? 'all' : `row ${row}`;
    return `${action} ${where}`;
  }

  isSelected(row: CellTypeEntry): boolean {
    return this.selectionModel.isSelected(row.name);
  }

  toggleRow(row: CellTypeEntry): void {
    this.selectionModel.toggle(row.name);
    this.cellTypesSelection.set(this.selectionModel.selected);
  }

  toggleAllRows(): void {
    const selection = this.selectionState() === 'full' ? [] : this.cellTypes().map((entry) => entry.name);
    this.cellTypesSelection.set(selection);
  }

  updateColor(row: CellTypeEntry, color: Rgb): void {
    const entries = this.cellTypes();
    const index = entries.indexOf(row);
    const copy = [...entries];

    copy[index] = { ...copy[index], color };
    this.cellTypes.set(copy);
  }

  resetSort(): void {
    const sorter = this.sort();
    const sortable = sorter.sortables.get('count');
    if (sortable) {
      do {
        sorter.sort(sortable);
      } while (sorter.direction !== 'desc');
    }
  }
}
