import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, HostBinding, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { delay, distinctUntilChanged, EMPTY, map, mergeWith, Observable, of, startWith } from 'rxjs';
import { TableDataService } from '../../services/table-data/tabledata.service';
import { runInZone } from '../../shared/run-in-zone';
import { ChooseVersion } from '../choose-version/choose-version';
import { ExtraHeader, HeaderData } from '../table/header';
import { TableData } from '../table/table';

/** Margin to be left when scrolling the table */
const TABLE_SCROLL_END_MARGIN = 10;

/** Displays the table data according to the selected version */
@Component({
  selector: 'table-version',
  templateUrl: './table-version.component.html',
  styleUrls: ['./table-version.component.scss'],
  standalone: false,
})
export class TableVersionComponent implements OnInit {
  /** Maintains horizontal scrolling of the table */
  @ViewChild('table', { static: true, read: CdkScrollable })
  set tableScroller(scrollable: CdkScrollable) {
    const isAtEnd = () => scrollable.measureScrollOffset('end') <= TABLE_SCROLL_END_MARGIN;

    const initialAtEnd = of(undefined).pipe(delay(100), map(isAtEnd));
    const obs = scrollable
      .elementScrolled()
      .pipe(map(isAtEnd), mergeWith(initialAtEnd), startWith(true), distinctUntilChanged(), runInZone(this.zone));

    obs.subscribe((val) => (this.tableScrollAtEnd = val));
  }

  /** Adds class scroll-end to the host element when table is scrolled to the right */
  @HostBinding('class.scroll-end') tableScrollAtEnd = false;

  /** Details of release and version */
  @Input() versionData: ChooseVersion[] = [];

  /** Flag to enable/disable version selector */
  @Input() versionChooserDisabled = false;

  /** Flag to display/hide total below the table */
  @Input() isTotal = false;

  /** Flag to display/hide Download CSV button */
  @Input() isDownload = false;

  /** Sets the header information and column definitions */
  @Input() set headerInfo(items: HeaderData[]) {
    this._headerInfo = this.createCellFunctions(items);
    this.displayedColumnsData = this.getColumnDefs(items);
  }

  /** Gets the header information */
  get headerInfo(): HeaderData[] {
    return this._headerInfo;
  }

  /** Sets the additional header information and their column definitions */
  @Input() set additionalHeaders(items: ExtraHeader[] | undefined) {
    this._additionalHeaders = items ?? [];
    this.additionalColumnsData = this.getColumnDefs(items);
  }

  /** Gets the additional header information */
  get additionalHeaders(): ExtraHeader[] {
    return this._additionalHeaders;
  }

  /** Sets the cell header information and their column definitions */
  @Input() set cellHeaders(items: ExtraHeader[] | undefined) {
    this._cellHeaders = items ?? [];
    this.cellHeadersData = this.getColumnDefs(items);
  }

  /** Gets the cell header information */
  get cellHeaders(): ExtraHeader[] {
    return this._cellHeaders;
  }

  /** Release and Version data */
  release!: ChooseVersion;

  /** Column definitions of the columns */
  displayedColumnsData: string[] = [];

  /** Column definitions of the additional columns to be displayed */
  additionalColumnsData: string[] = [];

  /** Column definitions of the cell columns to be displayed */
  cellHeadersData: string[] = [];

  /** Data to be displayed in the table */
  tableData: Observable<TableData[]> = EMPTY;

  /** Column definitions of the columns to be displayed */
  columns: Observable<string[]> = EMPTY;

  /** Stores header info */
  private _headerInfo: HeaderData[] = [];

  /** Stores additional headers */
  private _additionalHeaders: ExtraHeader[] = [];

  /** Stores cell headers */
  private _cellHeaders: ExtraHeader[] = [];

  /** Initializes TableDataServuce and NgZone */
  constructor(
    private readonly dataService: TableDataService,
    private readonly zone: NgZone,
  ) {}

  /** Sets the table data with default data */
  ngOnInit(): void {
    this.release = this.versionData[0];
    this.setData(this.release);
  }

  /** Sets the table data according to the selected version */
  setData(version: ChooseVersion): void {
    const data = this.dataService.getData(version.file, this.displayedColumnsData);
    this.release = version;
    this.tableData = data.pipe(map((result) => result.data));
    this.columns = data.pipe(map((result) => result.columns));
  }

  /** Creates a cell function and adds it to headerdata */
  private createCellFunctions(items: HeaderData[]): HeaderData[] {
    return items.map((item) => ({
      ...item,
      cell: new Function('element', `return ${item.cell}`) as HeaderData['cell'],
    }));
  }

  /** Returns the column definition of all the columns */
  private getColumnDefs(items: HeaderData[] | ExtraHeader[] | undefined): string[] {
    return items?.map((item) => item.columnDef) ?? [];
  }
}
