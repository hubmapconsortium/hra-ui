import { SelectionModel } from '@angular/cdk/collections';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { ColorPickerModule } from 'ngx-color-picker';
import { map } from 'rxjs';
import { CellTypeEntry } from '../../models/cell-type';
import { Rgb } from '@hra-ui/design-system/color-picker';
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
    ScrollingModule,
  ],
  templateUrl: './cell-types.component.html',
  styleUrl: './cell-types.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellTypesComponent {
  /** List of cell types */
  readonly cellTypes = model.required<CellTypeEntry[]>();
  /** List of selected cell types */
  readonly cellTypesSelection = model.required<string[]>();

  /** Currently selected cell type */
  readonly selectedCellType = input<string>('');

  /** Output event for download action */
  readonly download = output();

  /** Columns to be displayed in the table */
  protected readonly columns = ['select', 'name', 'count'];

  /** Tooltip position configuration */
  protected readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** Reference to MatSort directive */
  protected readonly sort = viewChild.required(MatSort);

  /** Bind sort state to data source */
  protected readonly sortBindRef = effect(() => (this.dataSource.sort = this.sort()));

  /** Change detector reference */
  private readonly cdr = inject(ChangeDetectorRef);

  /** Data source for the table */
  protected readonly dataSource = new MatTableDataSource<CellTypeEntry>();

  /** Bind data source to cell types */
  protected readonly dataSourceBindRef = effect(() => {
    this.dataSource.data = this.cellTypes();
    this.cdr.markForCheck();
  });

  /** Selection model for managing selected cell types */
  protected readonly selectionModel = new SelectionModel<string>(true);

  /** Bind selection model to cell types selection */
  protected readonly selectionModelBindRef = effect(
    () => {
      this.selectionModel.setSelection(...this.cellTypesSelection());
      this.cdr.markForCheck();
    },
    { allowSignalWrites: true },
  );

  /** Observable stream of selection changes */
  protected readonly selection$ = this.selectionModel.changed.pipe(map(() => this.selectionModel.selected));

  /** Signal for selection state */
  protected readonly selection = toSignal(this.selection$, { initialValue: [] });

  /** Computed selection state */
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

  /** Computed total cell count based on selection */
  protected totalCellCount = computed(() => {
    const sumCounts = (count: number, entry: CellTypeEntry) => {
      const value = this.isSelected(entry) ? entry.count : 0;
      return count + value;
    };

    // Grab dependency on current selection since selectionModel is used indirectly
    this.selection();

    return this.cellTypes().reduce(sumCounts, 0);
  });

  /** Toggle state for cell types info */
  protected cellTypesInfoOpen = false;

  /** Track cell type entries by name */
  trackByName(_index: number, item: CellTypeEntry): string {
    return item.name;
  }

  /** Generate checkbox label based on selection state */
  getCheckboxLabel(isSelected: boolean, row?: number): string {
    const action = isSelected ? 'deselect' : 'select';
    const where = row === undefined ? 'all' : `row ${row}`;
    return `${action} ${where}`;
  }

  /** Check if a cell type entry is selected */
  isSelected(row: CellTypeEntry): boolean {
    return this.selectionModel.isSelected(row.name);
  }

  /** Toggle selection state of a cell type entry */
  toggleRow(row: CellTypeEntry): void {
    this.selectionModel.toggle(row.name);
    this.cellTypesSelection.set(this.selectionModel.selected);
  }

  /** Toggle selection state of all cell type entries */
  toggleAllRows(): void {
    const selection = this.selectionState() === 'full' ? [] : this.cellTypes().map((entry) => entry.name);
    this.cellTypesSelection.set(selection);
  }

  /** Update color for a cell type entry */
  updateColor(row: CellTypeEntry, color: Rgb): void {
    const entries = this.cellTypes();
    const index = entries.indexOf(row);
    const copy = [...entries];

    copy[index] = { ...copy[index], color };
    this.cellTypes.set(copy);
  }

  /** Reset sort state to default */
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
