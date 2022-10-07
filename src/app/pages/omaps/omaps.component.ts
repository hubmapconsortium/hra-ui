import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ChooseVersion } from 'src/app/components/choose-version/choose-version';
import { TableData } from 'src/app/components/table/table';
import { TableDataService } from 'src/app/services/table-data/tabledata.service';
import { acknowledgementsData, columnHeaders, displayedColumnsData, omapsHeading, omapsVersionData, overviewData, sopData } from './omaps.contents';

@Component({
  selector: 'ccf-omaps',
  templateUrl: './omaps.component.html',
  styleUrls: ['./omaps.component.scss']
})
export class OmapsComponent {

  omapsHeading = omapsHeading
  overviewData = overviewData
  sopData = sopData
  acknowledgementsData = acknowledgementsData
  omapsVersionData = omapsVersionData
  displayedColumnsData = displayedColumnsData
  columnHeaders = columnHeaders
  placeholderDate: ChooseVersion
  tableData: Observable<TableData[]> = EMPTY
  constructor(private readonly dataService: TableDataService) { }

  setOmapsData(version: ChooseVersion): void {
    this.tableData = this.dataService.getData(version.file);
  }
  ngOnInit(): void {
    this.setOmapsData(omapsVersionData[0]);
    this.placeholderDate = omapsVersionData[0];
  }
}
