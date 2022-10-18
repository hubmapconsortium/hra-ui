import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableData, TissueTableInfo } from './tissue-info-table';

@Component({
  selector: 'ccf-tissue-info',
  templateUrl: './tissue-info-table.component.html',
  styleUrls: ['./tissue-info-table.component.scss']
})
export class TissueInfoTableComponent implements AfterViewInit {

  @Input()
  set data(value: TissueTableInfo) {
    this.dataSource.data = value.tissueData;
  }

  readonly dataSource = new MatTableDataSource<TableData>([]);
  @ViewChild(MatSort) sort: MatSort;

  columns = [
    {
      columnDef: 'label',
      header: 'Label',
      cell: (element: TableData) => `${element.label}`
    },
    {
      columnDef: 'value',
      header: 'Value',
      cell: (element: TableData) => `${element.value}`
    }
  ];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  displayedColumns = this.columns.map(c => c.columnDef);
}
