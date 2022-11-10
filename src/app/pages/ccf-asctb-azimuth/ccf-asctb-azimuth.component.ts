import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { TableData } from 'src/app/components/table/table';
import { TableDataService } from 'src/app/services/table-data/tabledata.service';
import { azimuthHeader, comparisonAsctbVsAzimuth, displayedColumnsData, headerInfo, overviewAzimuthData, TermsOfUseData } from './ccf-asctb-azimuth.content';

@Component({
  selector: 'ccf-asctb-azimuth',
  templateUrl: './ccf-asctb-azimuth.component.html',
  styleUrls: ['./ccf-asctb-azimuth.component.scss']
})
export class CcfAsctbAzimuthComponent {

  constructor(private readonly dataService: TableDataService) { }

  azimuthHeader = azimuthHeader
  overviewAzimuthData = overviewAzimuthData
  TermsOfUseData = TermsOfUseData
  comparisonAsctbVsAzimuth = comparisonAsctbVsAzimuth
  headerInfo=headerInfo
  displayedColumnsData=displayedColumnsData
  tableData = this.dataService.getData('azimuth.csv');
}
