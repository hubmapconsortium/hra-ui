import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Observable, map } from 'rxjs';
import { TableDataService } from '../../services/table-data/tabledata.service';
import { ChooseVersion } from '../choose-version/choose-version';
import { HeaderData } from '../table/header';
import { TableData } from '../table/table';
import { OrganData, VersionOrgans } from '../two-dim-image/two-dim-image';

/** Displays 2D FTU's according to the selected version */
@Component({
  selector: 'ccf-organ-version',
  templateUrl: './organ-version.component.html',
  styleUrls: ['./organ-version.component.scss'],
})
export class OrganVersionComponent implements OnInit {
  /** Deatils of the release and version */
  @Input() versionData: ChooseVersion[] = [];

  /** Deatils of version and organ data */
  @Input() organInfo: VersionOrgans[] = [];

  /** Flag to view/hide organ ftu table */
  @Input() tableRequired: boolean = false;

  /** Details of column definitions and headers */
  @Input() headerInfo: HeaderData[] = [];

  /** Flag to view tissue details in multiple rows */
  @Input() isMultiRow: boolean = false;

  /** Current selected version and it's organ data */
  info: VersionOrgans;

  /** Organ data of current selected organ */
  organData: OrganData[];

  /** Tile of the card */
  cardTitle = '';

  /** Data for the FTU table */
  tableData: Observable<TableData[]> = EMPTY;

  /** Columns to display in the FTU table */
  columns: Observable<string[]> = EMPTY;

  /** Title for the FTU Table */
  tableTitle: string = '';

  /** Images of the organs to be displayed in the tabs */
  filterImages: OrganData[];

  /** Selected version from the version data */
  version: ChooseVersion;

  /** Column definitons of the columns to be displayed */
  displayedColumnsData: string[] = [];

  /** Creates instance of Router, ActivatedRoute, TableDataService */
  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly dataService: TableDataService
  ) {}

  /** Checks if both the strings are equal */
  iCaseEquals(str1: string, str2: string): boolean {
    return str1.toLowerCase() === str2.toLowerCase();
  }

  /** Sets version and ftu data */
  ngOnInit(): void {
    const [
      {
        version: defaultVersion,
        organData: [{ name: defaultOrgan }],
      },
    ] = this.organInfo;
    const { version = defaultVersion, organ = defaultOrgan } =
      this.route.snapshot.queryParams;
    if (this.headerInfo?.length > 0) {
      this.headerInfo = this.headerInfo.map((data) => ({
        ...data,
        cell: new Function(
          'element',
          `return ${data.cell}`
        ) as HeaderData['cell'],
      }));
      this.displayedColumnsData = this.headerInfo.map((h) => h.columnDef);
      this.setVersion(`${version}`, `${organ}`);
      this.setFtu(this.organData[0].name);
    } else {
      this.setVersion(`${version}`, `${organ}`);
    }
  }

  /** Sets version data according to the selected version and organ */
  setVersion(version: string, organ?: string): void {
    const info =
      this.organInfo.find((item) => this.iCaseEquals(item.version, version)) ??
      this.organInfo[0];
    const choose = this.versionData.find(
      (item) => item.version === info.version
    )!;
    this.info = info;
    this.version = choose;
    this.filterImages = info.organData;
    this.setOrgan(organ ?? info.organData[0].name);
  }

  /** Sets organ data according to the selected organ */
  setOrgan(organ: string): void {
    const {
      info: { organData, version },
    } = this;
    const data = organData.filter((item) => this.iCaseEquals(item.name, organ));

    if (data.length === 0) {
      this.setOrgan(organData[0].name);
    } else {
      this.organData = data;
      if (this.headerInfo?.length > 0) {
        this.cardTitle = data[0].name + ' Functional Tissue Units';
      } else {
        this.cardTitle = data[0].name;
      }
      this.updateQueryParams({ version, organ });
    }
  }

  /** Updates the query parameters */
  updateQueryParams(params: Params): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  /** Sets the ftu table data with necessary columns */
  setFtu(organName: OrganData['name']): void {
    const data = this.dataService.getData(
      'ftu-cell-count-5th-release.csv',
      this.displayedColumnsData
    );
    this.tableData = data.pipe(
      map((result) => result.data),
      map((data) =>
        data.filter((record) =>
          this.iCaseEquals(record['Organ'] as string, organName)
        )
      )
    );
    this.columns = data.pipe(map((result) => result.columns));
    this.tableTitle =
      organName +
      ' Functional Tissue Units: Anatomical Structures & Cell Types';
  }
}
