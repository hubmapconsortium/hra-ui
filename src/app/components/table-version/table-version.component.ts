import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, map, Observable } from 'rxjs';
import { tissueData } from 'src/app/pages/tissue-info-page/tissue-info-page.content';
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
  @Input() versionChooserDisabled = false;
  @Input() isTotal = false;

  @Input() set headerInfo(items: HeaderData[]) {
    this._headerInfo = this.createCellFunctions(items);
    this.displayedColumnsData = this.getColumnDefs(items);
  }
  get headerInfo(): HeaderData[] {
    return this._headerInfo;
  }

  @Input() set additionalHeaders(items: ExtraHeader[] | undefined) {
    this._additionalHeaders = items ?? [];
    this.additionalColumnsData = this.getColumnDefs(items);
  }
  get additionalHeaders(): ExtraHeader[] {
    return this._additionalHeaders;
  }

  @Input() set cellHeaders(items: ExtraHeader[] | undefined) {
    this._cellHeaders = items ?? [];
    this.cellHeadersData = this.getColumnDefs(items);
  }
  get cellHeaders(): ExtraHeader[] {
    return this._cellHeaders;
  }

  release: ChooseVersion;
  displayedColumnsData: string[] = [];
  additionalColumnsData: string[] = [];
  cellHeadersData: string[] = [];
  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;

  private _headerInfo: HeaderData[] = [];
  private _additionalHeaders: ExtraHeader[] = [];
  private _cellHeaders: ExtraHeader[] = [];

  constructor(private readonly dataService: TableDataService) { }
  
  ngOnInit(): void {
    this.setData(this.release = this.versionData[0]);
  }

  setData(version: ChooseVersion): void {
    const data = this.dataService.getData(version.file, this.displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
    this.columns = data.pipe(map(result => result.columns));
  }

  private createCellFunctions(items: HeaderData[]): HeaderData[] {
    return items.map((item) => ({
      ...item,
      cell: new Function('element', `return ${item.cell}`) as HeaderData['cell']
    }));
  }

  private getColumnDefs(items: HeaderData[] | ExtraHeader[] | undefined): string[] {
    return items?.map(item => item.columnDef) ?? [];
  }
}
