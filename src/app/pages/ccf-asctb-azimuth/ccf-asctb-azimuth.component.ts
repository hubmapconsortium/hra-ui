import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { ExtraHeader, HeaderData } from 'src/app/components/table/header';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { TableData } from '../../components/table/table';
import { TableDataService } from '../../services/table-data/tabledata.service';


@Component({
  selector: 'asctb-azimuth',
  templateUrl: './ccf-asctb-azimuth.component.html',
  styleUrls: ['./ccf-asctb-azimuth.component.scss']
})
export class CcfAsctbAzimuthComponent {
  azimuthHeader: PageHeaderItems[];
  overviewAzimuthData: PageDataItems[];
  TermsOfUseData: PageDataItems[];
  azimuthCtandCount: PageDataItems[];
  comparisonOfCXG: PageDataItems[];
  AzimuthCTCounts: PageDataItems[];
  CodeOnGitHub: PageDataItems[];
  TermsOfUse: PageDataItems[];
  License: PageDataItems[];
  Citation: PageDataItems[];
  References: PageDataItems[];
  headerInfo: HeaderData[]
  displayedColumnsData: string[];
  additionalHeaders: ExtraHeader[];
  additionalColumnsData: string[];
  cellData: ExtraHeader[];
  cellHeaders: string[];
  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;

  constructor(private readonly dataService: TableDataService, route: ActivatedRoute) { 
    const data = route.snapshot.data['content'];
    this.azimuthHeader = data.azimuthHeader;
    this.overviewAzimuthData = data.overviewAzimuthData;
    this.TermsOfUseData = data.TermsOfUseData;
    this.azimuthCtandCount = data.azimuthCtandCount;
    this.comparisonOfCXG = data.comparisonOfCXG;
    this.AzimuthCTCounts = data.azimuthCTCounts;
    this.CodeOnGitHub = data.codeOnGitHub;
    this.TermsOfUse = data.termsOfUse;
    this.License = data.license;
    this.Citation = data.citation;
    this.References = data.references;
    this.headerInfo = this.headerInfo.map((data) => ({
      ...data,
      cell: new Function('element', `return ${data.cell}`) as HeaderData['cell']
    }))
    this.displayedColumnsData = this.headerInfo.map(h=>h.columnDef);
    this.additionalHeaders = data.additionalHeaders
    this.additionalColumnsData = this.additionalHeaders.map(h=>h.columnDef)
    this.cellData = data.cellData;
    this.cellHeaders = this.cellData.map(h=>h.columnDef)
    this.setData();
  }

  setData(): void {
    const data = this.dataService.getData('azimuth.csv', this.displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
  }
}
