import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Observable, map } from 'rxjs';
import { TableDataService } from 'src/app/services/table-data/tabledata.service';
import { ChooseVersion } from '../choose-version/choose-version';
import { HeaderData } from '../table/header';
import { TableData } from '../table/table';
import { OrganData, VersionOrgans } from '../two-dim-image/two-dim-image';

function iCaseEquals(str1: string, str2: string): boolean {
  return str1.toLowerCase() === str2.toLowerCase();
}

@Component({
  selector: 'ccf-organ-version',
  templateUrl: './organ-version.component.html',
  styleUrls: ['./organ-version.component.scss']
})
export class OrganVersionComponent {
  @Input() versionData: ChooseVersion[];
  @Input() organInfo: VersionOrgans[];
  @Input() tableRequired: boolean;
  @Input() headerInfo: HeaderData[] = [];
  @Input() isMultiRow: boolean;

  info: VersionOrgans;
  organData: OrganData[];
  cardTitle = "";
  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;
  tableTitle: string = "";
  filterImages: OrganData[];
  version: ChooseVersion;

  displayedColumnsData: string[] = [];

  constructor(private router: Router, private readonly route: ActivatedRoute, private readonly dataService: TableDataService) { }

  ngOnInit(): void {
    const [{ version: defaultVersion, organData: [{ name: defaultOrgan }] }] = this.organInfo;
    const { version = defaultVersion, organ = defaultOrgan } = this.route.snapshot.queryParams;
    if (this.headerInfo) {
      this.headerInfo = this.headerInfo.map((data) => ({
        ...data,
        cell: new Function('element', `return ${data.cell}`) as HeaderData['cell']
      }));
      this.displayedColumnsData = this.headerInfo.map(h => h.columnDef);
      this.setVersion(`${version}`, `${organ}`);
      this.setFtu(this.organData[0].name);
    }
    else {
      this.setVersion(`${version}`, `${organ}`);
    }
  }

  setVersion(version: string, organ?: string): void {
    const info = this.organInfo.find(item => iCaseEquals(item.version, version)) ?? this.organInfo[0];
    const choose = this.versionData.find(item => item.version === info.version)!;
    this.info = info;
    this.version = choose;
    this.filterImages = info.organData
    this.setOrgan(organ ?? info.organData[0].name);
  }

  setOrgan(organ: string): void {
    const { info: { organData, version } } = this;
    const data = organData.filter(item => iCaseEquals(item.name, organ));

    if (data.length === 0) {
      this.setOrgan(organData[0].name);
    } else {
      this.organData = data;
      if (this.headerInfo) {
        this.cardTitle = data[0].name + ' Functional Tissue Units';
      }
      else {
        this.cardTitle = data[0].name;
      }
      this.updateQueryParams({ version, organ });
    }
  }

  updateQueryParams(params: Params): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  setFtu(organName: OrganData["name"]): void {
    const data = this.dataService.getData('ftu-cell-count-5th-release.csv', this.displayedColumnsData);
    this.tableData = data.pipe(
      map((result) => result.data),
      map((data) => data.filter(record => iCaseEquals(record['Organ'] as string, organName)))
    );
    this.columns = data.pipe(map(result => result.columns));
    this.tableTitle = organName + ' Functional Tissue Units: Anatomical Structures & Cell Types'
  }
}
