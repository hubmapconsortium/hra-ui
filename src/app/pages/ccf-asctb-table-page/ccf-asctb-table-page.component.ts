import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { SopLinks } from '../../components/sop-links/sop-links';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { TableData } from '../../components/table/table';
import { TableDataService } from '../../services/table-data/tabledata.service';
import { displayedColumnsData, headerInfo } from './ccf-asctb-table-page.content';
import { UseButton } from 'src/app/components/use-button/use-button';


@Component({
  selector: 'asctb-tables',
  templateUrl: './ccf-asctb-table-page.component.html',
  styleUrls: ['./ccf-asctb-table-page.component.scss']
})
export class CcfTablePageComponent {
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
  asctbTableOntologyValidationReports: PageDataItems[];
  asctbTableOntologyValidationReportsButton: UseButton;

  constructor(private readonly dataService: TableDataService, route: ActivatedRoute) {
    const data = route.snapshot.data['content'];
    this.headerCardDetails = data.headerCardDetails;
    this.overviewData = data.overviewData;
    this.existingTablesData = data.existingTablesData;
    this.exploreTablesData = data.exploreTablesData;
    this.sopLinksData = data.sopLinksData;
    this.versionData = data.versionData;
    this.tablesUnderDevelopmentData = data.tablesUnderDevelopmentData;
    this.acknowledgmentsData = data.acknowledgmentsData;
    this.asctbTableOntologyValidationReports = data.asctbTableOntologyValidationReports;
    this.asctbTableOntologyValidationReportsButton = data.asctbTableOntologyValidationReportsButton;
    this.release = this.versionData[0];
    this.setData(this.versionData[0]);
  }

  setData(version: ChooseVersion): void {
    const data = this.dataService.getData(version.file, displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
    this.columns = data.pipe(map(result => result.columns));
  }
}
