import { Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExtraHeader, HeaderData } from './header';
import { TableData } from './table';

@Component({
  selector: 'ccf-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})

export class TableComponent {

  @ViewChild(MatSort, { static: true })
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  @Input() isOrgan: boolean

  @Input()
  set typeCount(data: TableData[]) {
    this.dataSource.data = data;
  }

  @Input() displayedColumns: string[] = [];

  @Input() columns: HeaderData[] = [];

  @Input() isTotal: boolean = false;

  @Input() additionalHeaders?: ExtraHeader[];

  @Input() additionalColumnsData?: string[];

  @Input() cellHeaders?: ExtraHeader[];

  @Input() cellHeadersData?: string[];

  readonly dataSource = new MatTableDataSource<TableData>([]);

  getTotal(id: string) {
    return this.dataSource.data.reduce((acc, entry) => acc + (entry[id] as number), 0);
  }

  isNumericColumn(column: string): boolean {
    return typeof this.dataSource.data[0]?.[column] === 'number';
  }

  isTotalRequired(column: any): boolean {
    return column.isTotalRequired
  }
}
