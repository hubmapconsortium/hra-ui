import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, map, Observable } from 'rxjs';
import { TableDataService } from 'src/app/services/table-data/tabledata.service';
import { ChooseVersion } from '../choose-version/choose-version';
import { ExtraHeader, HeaderData } from '../table/header';
import { TableData } from '../table/table';

@Component({
  selector: 'table-version',
  templateUrl: './table-version.component.html',
  styleUrls: ['./table-version.component.scss']
})
export class TableVersionComponent {
  @Input() versionData: ChooseVersion[];
  @Input() set headerInfo(items: HeaderData[]) {
    this._headerInfo = items.map((data) => ({
      ...data,
      cell: new Function('element', `return ${data.cell}`) as HeaderData['cell']
    }));
    this.displayedColumnsData = items.map((data) => data.columnDef);
  }
  get headerInfo(): HeaderData[] {
    return this._headerInfo;
  }

  release: ChooseVersion;
  displayedColumnsData: string[];
  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;

  private _headerInfo: HeaderData[];

  constructor(private readonly dataService: TableDataService) { }
  
  ngOnInit(): void {
    this.setData(this.release = this.versionData[0]);
  }

  setData(version: ChooseVersion): void {
    const data = this.dataService.getData(version.file, this.displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
    this.columns = data.pipe(map(result => result.columns));
  }
}
