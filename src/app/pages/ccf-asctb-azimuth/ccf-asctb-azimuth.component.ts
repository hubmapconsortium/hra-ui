import { Component } from '@angular/core';
import { TableDataService } from 'src/app/services/table-data/tabledata.service';
import { additionalHeaders, additionalColumnsData, azimuthHeader, comparisonAsctbVsAzimuth, displayedColumnsData, headerInfo, overviewAzimuthData, TermsOfUseData, cellData, cellHeaders } from './ccf-asctb-azimuth.content';

@Component({
  selector: 'asctb-azimuth',
  templateUrl: './ccf-asctb-azimuth.component.html',
  styleUrls: ['./ccf-asctb-azimuth.component.scss']
})
export class CcfAsctbAzimuthComponent {

  constructor(private readonly dataService: TableDataService) { }

  azimuthHeader = azimuthHeader
  overviewAzimuthData = overviewAzimuthData
  TermsOfUseData = TermsOfUseData
  comparisonAsctbVsAzimuth = comparisonAsctbVsAzimuth
  headerInfo = headerInfo
  displayedColumnsData = displayedColumnsData
  additionalHeaders = additionalHeaders
  tableData = this.dataService.getData('azimuth.csv');
  additionalColumnsData = additionalColumnsData;
  cellData = cellData
  cellHeaders = cellHeaders
}
