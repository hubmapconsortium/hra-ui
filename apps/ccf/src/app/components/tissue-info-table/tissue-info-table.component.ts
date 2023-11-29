import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableData, TissueTableInfo } from './tissue-info-table';

/** Displays tissue metadata and information table */
@Component({
  selector: 'ccf-tissue-info',
  templateUrl: './tissue-info-table.component.html',
  styleUrls: ['./tissue-info-table.component.scss'],
})
export class TissueInfoTableComponent {
  /** Sorts the table data */
  @ViewChild(MatSort, { static: true }) set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  /** Sets the table data with correct tissue information */
  @Input()
  set data(value: TissueTableInfo) {
    this.dataSource.data = value.tissueData;
  }
  /** Datasource to store table data */
  readonly dataSource = new MatTableDataSource<TableData>([]);

  /** Details of the columns to be displayed */
  columns = [
    {
      columnDef: 'label',
      header: 'Label',
      cell: (element: TableData) => `${element.label}`,
    },
    {
      columnDef: 'value',
      header: 'Value',
      cell: (element: TableData) => `${element.value}`,
    },
  ];

  /** Column definitions of the columns to be displayed */
  displayedColumns = this.columns.map((c) => c.columnDef);
}
