import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { TableData } from '../../components/table/table';
import { TableDataService } from '../../services/table-data/tabledata.service';
import { additionalColumnsData, additionalHeaders, cellData, cellHeaders, displayedColumnsData, headerInfo } from './ccf-asctb-azimuth.content';


@Component({
  selector: 'asctb-azimuth',
  templateUrl: './ccf-asctb-azimuth.component.html',
  styleUrls: ['./ccf-asctb-azimuth.component.scss']
})
export class CcfAsctbAzimuthComponent implements OnInit {
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
  Acknowledgements: PageDataItems[];
  References: PageDataItems[];
  headerInfo= headerInfo;
  displayedColumnsData= displayedColumnsData;
  additionalHeaders = additionalHeaders;
  additionalColumnsData = additionalColumnsData;
  cellData = cellData;
  cellHeaders = cellHeaders;

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
    this.Acknowledgements = data.acknowledgements;
    this.References = data.references;
  }

  setData(): void {
    const data = this.dataService.getData('azimuth.csv', displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
  }

  ngOnInit(): void {
    this.setData();
  }
}
