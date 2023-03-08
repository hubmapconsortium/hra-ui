import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

export type DataType = 'text' | 'numeric' | 'object';

export interface Column {
  label: string;
  dataType: DataType;
}

export interface DataCell {
  name: string;
  uberonId: string;
  numberOfDatasets: number;
  cellTypeName: string;
  clId: string;
  numberOfCells: string;
  geneName: string;
  hgncId: string;
  meanExpressionValue: number;
}

@Component({
  selector: 'hra-biomarker-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './biomarker-table.component.html',
  styleUrls: ['./biomarker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableComponent<T extends DataCell> implements OnChanges {
  @Input() columns: Column[] = [];
  @Input() data: (string | number | T | undefined)[][] = [];

  get columnIds(): string[] {
    return this.columns.map((column) => column.label);
  }

  readonly dataSource = new MatTableDataSource<unknown[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.dataSource.data = this.data;
    }
  }
}
