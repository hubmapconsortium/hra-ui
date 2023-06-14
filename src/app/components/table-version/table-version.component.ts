import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, EventEmitter, HostBinding, Input, NgZone, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { delay, distinctUntilChanged, EMPTY, map, mergeWith, Observable, of, startWith, Subject, tap } from 'rxjs';
import { TableDataService } from '../../services/table-data/tabledata.service';
import { runInZone } from '../../shared/run-in-zone';
import { ChooseVersion } from '../choose-version/choose-version';
import { ExtraHeader, HeaderData } from '../table/header';
import { TableData } from '../table/table';


const TABLE_SCROLL_END_MARGIN = 10;

@Component({
  selector: 'table-version',
  templateUrl: './table-version.component.html',
  styleUrls: ['./table-version.component.scss']
})
export class TableVersionComponent {
  @ViewChild('table', { static: true, read: CdkScrollable })
  set tableScroller(scrollable: CdkScrollable) {
    const isAtEnd = () => scrollable.measureScrollOffset('end') <= TABLE_SCROLL_END_MARGIN;
    const initialAtEnd = of(undefined).pipe(
      delay(100),
      map(isAtEnd)
    );
    const obs = scrollable.elementScrolled().pipe(
      map(isAtEnd),
      mergeWith(initialAtEnd),
      startWith(true),
      distinctUntilChanged(),
      runInZone(this.zone)
    );

    obs.subscribe(val => (this.tableScrollAtEnd = val));
  }

  @HostBinding('class.scroll-end') tableScrollAtEnd = false;

  @Input() versionData: ChooseVersion[];
  @Input() versionChooserDisabled = false;
  @Input() isTotal = false;
  @Input() isDownload: boolean = false;

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

  constructor(private readonly dataService: TableDataService, private readonly zone: NgZone) { }
  
  ngOnInit(): void {
    this.setData(this.release = this.versionData[0]);
  }

  setData(version: ChooseVersion): void {
    const data = this.dataService.getData(version.file, this.displayedColumnsData);
    this.release = version;
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
