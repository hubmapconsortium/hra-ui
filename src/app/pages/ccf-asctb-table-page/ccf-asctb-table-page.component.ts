import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { SopLinks } from '../../components/sop-links/sop-links';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { TableData } from '../../components/table/table';
import { TableDataService } from '../../services/table-data/tabledata.service';
import { UseButton } from 'src/app/components/use-button/use-button';
import { HeaderData } from 'src/app/components/table/header';

interface AsctbTable {
  headerCardDetails: PageHeaderItems[];
  overviewData: PageDataItems[];
  existingTablesData: PageDataItems[];
  exploreTablesData: PageDataItems[];
  tablesUnderDevelopmentData: PageDataItems[];
  sopLinksData: SopLinks[]
  displayedColumnsData: string[];
  headerInfo: HeaderData[]
  versionData: ChooseVersion[]
  release: ChooseVersion;
  asctbTableOntologyValidationReports: PageDataItems[];
  asctbTableOntologyValidationReportsButton: UseButton;
}

@Component({
  selector: 'asctb-tables',
  templateUrl: './ccf-asctb-table-page.component.html',
  styleUrls: ['./ccf-asctb-table-page.component.scss']
})
export class CcfTablePageComponent {
  data = this.route.snapshot.data['content'] as AsctbTable;
  headerCardDetails = this.data.headerCardDetails;
  overviewData = this.data.overviewData;
  existingTablesData = this.data.existingTablesData;
  exploreTablesData = this.data.exploreTablesData;
  sopLinksData = this.data.sopLinksData;
  versionData = this.data.versionData;
  tablesUnderDevelopmentData = this.data.tablesUnderDevelopmentData;
  asctbTableOntologyValidationReports = this.data.asctbTableOntologyValidationReports;
  asctbTableOntologyValidationReportsButton = this.data.asctbTableOntologyValidationReportsButton;
  release = this.versionData[0];
  headerInfo = this.data.headerInfo.map((data) => ({
    ...data,
    cell: new Function('element', `return ${data.cell}`) as HeaderData['cell']
  }))
  displayedColumnsData = this.headerInfo.map(h => h.columnDef);
  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;
  
  setData(version: ChooseVersion): void {
    const data = this.dataService.getData(version.file, this.displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
    this.columns = data.pipe(map(result => result.columns));
  }
  constructor(private readonly dataService: TableDataService, private readonly route: ActivatedRoute) {
    this.setData(this.versionData[0]);
  }
}
