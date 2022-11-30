import { TableDataService } from '../../services/table-data/tabledata.service';
import { TableData } from '../../components/table/table';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { Component, OnInit } from '@angular/core';
import { headerCardDetails, overviewData, existingTablesData, exploreTablesData, sopLinksData, displayedColumnsData, headerInfo, versionData } from './ccf-asctb-table-page.contents';
import { EMPTY, Observable } from 'rxjs';

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

  constructor(private readonly dataService: TableDataService) { }

  setData(version: ChooseVersion): void {
    this.tableData = this.dataService.getData(version.file);
  }

  ngOnInit(): void {
    this.setData(versionData[0]);
    this.release = versionData[0];
  }
}
