import { TableDataService } from '../../services/table-data/tabledata.service';
import { TableData } from '../../components/table/table';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { Component, OnInit } from '@angular/core';
import { headerCardDetails, overviewData, existingTablesData, exploreTablesData, sopLinksData, displayedColumnsData, headerInfo, versionData } from './ccf-asctb-table-page.contents';
import { EMPTY, Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { SopLinks } from 'src/app/components/sop-links/sop-links';
import { tissueData } from '../tissue-info-page/tissue-info-page.contents';

@Component({
  selector: 'asctb-tables',
  templateUrl: './ccf-asctb-table-page.component.html',
  styleUrls: ['./ccf-asctb-table-page.component.scss']
})
export class CcfTablePageComponent implements OnInit {

  headerCardDetails: PageHeaderItems[];
  overviewData: PageDataItems[];
  existingTablesData: PageDataItems[];
  exploreTablesData: PageDataItems[];
  tablesUnderDevelopmentData: PageDataItems[];
  acknowledgmentsData: PageDataItems[];
  sopLinksData: SopLinks[]
  displayedColumnsData = displayedColumnsData
  headerInfo = headerInfo
  versionData: ChooseVersion[]
  release: ChooseVersion;

  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;

  constructor(private readonly dataService: TableDataService, private readonly route: ActivatedRoute) {
    const data = route.snapshot.data['ccfTablePage']
    this.headerCardDetails = data.headerCardDetails
    this.overviewData = data.overviewData
    this.existingTablesData = data.existingTablesData
    this.exploreTablesData = data.exploreTablesData
    this.sopLinksData = data.sopLinksData
    this.versionData = data.versionData
    this.tablesUnderDevelopmentData = data.tablesUnderDevelopmentData
    this.acknowledgmentsData = data.acknowledgmentsData
  }

  setData(version: ChooseVersion): void {
    const data = this.dataService.getData(version.file, displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
    this.columns = data.pipe(map(result => result.columns));
  }

  ngOnInit(): void {
    this.setData(this.versionData[0]);
    this.release = this.versionData[0];
  }
}
