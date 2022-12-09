import { Component } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { ChooseVersion } from 'src/app/components/choose-version/choose-version';
import { TableData } from 'src/app/components/table/table';
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
  additionalColumnsData = additionalColumnsData;
  cellData = cellData
  cellHeaders = cellHeaders

  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;

  setData(): void {
    const data = this.dataService.getData('azimuth.csv', displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
    console.log(this.tableData)
  }

  ngOnInit(): void {
    this.setData();
  }
}
