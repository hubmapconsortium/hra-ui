import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { BiomarkerTableDataIconComponent, DataItem } from '@hra-ui/components/molecules';

export interface DataCell {
  color: string;
  size: number;
  data: DataItem[][];
}

export type DataRow<T> = [string, number | undefined, ...(T | undefined)[]];

@Component({
  selector: 'hra-biomarker-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, BiomarkerTableDataIconComponent],
  templateUrl: './biomarker-table.component.html',
  styleUrls: ['./biomarker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableComponent<T extends DataCell> implements OnChanges {
  @Input() columns: string[] = [];
  @Input() data: DataRow<T>[] = [];

  get columnsWithTypeAndCount(): string[] {
    return ['type', 'count', ...this.columns];
  }

  readonly dataSource = new MatTableDataSource<DataRow<T>>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.dataSource.data = this.data;
    }
  }
}
