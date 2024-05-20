import { SelectionModel } from '@angular/cdk/collections';
import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, effect, input, model, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerLabelComponent } from '../color-picker-label/color-picker-label.component';

/** Interface for Cell Type Option */
export interface CellTypeOption {
  /** Name of the cell */
  name: string;
  /** Count of the cell */
  count: number;
  /** Color of the cell */
  color?: string;
}

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
export class CellTypesComponent implements AfterViewInit {
  /** Data for Cell Types table */
  data = model.required<CellTypeOption[]>();
  /** Name of the anchor cell type */
  anchor = input<string>();
  /** Columns to be displayed */
  displayedColumns: string[] = ['select', 'name', 'count'];
  /** Datasource to store table data */
  dataSource = new MatTableDataSource<CellTypeOption>();
  /** Selection to select cell type rows */
  selection = new SelectionModel<CellTypeOption>(true, []);
  /** Total number of cell type rows */
  totalCellTypes = this.dataSource.data.length;
  /** Flag to check if info tooltip is open */
  cellTypesInfoOpen = false;
  /** Tooltip overlay position */
  overlayPositions: ConnectionPositionPair[] = [
    {
      originX: 'end',
      overlayX: 'start',
      originY: 'top',
      overlayY: 'top',
    },
  ];

  /** Sorts the Cell Types table */
  sort = viewChild.required(MatSort);

  /** Sets input to the table datasource */
  constructor() {
    effect(
      () => {
        this.dataSource.data = this.data();
        this.totalCellTypes = this.dataSource.data.length;
      },
      { allowSignalWrites: true },
    );
  }

  /** Sorts the table data after component loads */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected === this.dataSource.data.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CellTypeOption, index?: number): string {
    if (!row || index === undefined) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index + 1}`;
  }

  /** Calculates the total number of cells in the table */
  totalCells() {
    const sum = this.dataSource.data.reduce((acc, entry) => acc + entry.count, 0);
    return sum.toLocaleString();
  }
}
