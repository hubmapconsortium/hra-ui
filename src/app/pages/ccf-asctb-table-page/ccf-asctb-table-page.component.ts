import { TableDataService } from '../../services/table-data/tabledata.service';
import { TableData } from '../../components/table/table';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { Component, OnInit } from '@angular/core';
import { headerCardDetails, overviewData, existingTablesData, exploreTablesData, sopLinksData, displayedColumnsData, headerInfo, versionData } from './ccf-asctb-table-page.contents';
import { EMPTY, map, Observable } from 'rxjs';

@Component({
  selector: 'asctb-tables',
  templateUrl: './ccf-asctb-table-page.component.html',
  styleUrls: ['./ccf-asctb-table-page.component.scss']
})
export class CcfTablePageComponent implements OnInit {

  headerCardDetails = headerCardDetails;
  overviewData = overviewData;
  existingTablesData = existingTablesData;
  exploreTablesData = exploreTablesData;
  sopLinksData = sopLinksData
  displayedColumnsData = displayedColumnsData
  headerInfo = headerInfo
  versionData = versionData
  release: ChooseVersion;

  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;

  constructor(private readonly dataService: TableDataService) { }

  setData(version: ChooseVersion): void {
    const data = this.dataService.getData(version.file, displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
    this.columns = data.pipe(map(result => result.columns));
  }

  ngOnInit(): void {
    this.setData(versionData[0]);
    this.release = versionData[0];
  }
}
