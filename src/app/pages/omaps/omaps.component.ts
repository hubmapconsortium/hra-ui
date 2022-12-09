import { Component } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { ChooseVersion } from 'src/app/components/choose-version/choose-version';
import { TableData } from 'src/app/components/table/table';
import { TableDataService } from 'src/app/services/table-data/tabledata.service';
import { acknowledgementsData, columnHeaders, displayedColumnsData, goalsForOmaps, omapsHeading, omapsVersionData, overviewData, sopData } from './omaps.contents';

@Component({
  selector: 'omap',
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
  goalsForOmaps = goalsForOmaps
  placeholderDate: ChooseVersion
  tableData: Observable<TableData[]> = EMPTY
  columns: Observable<string[]> = EMPTY;
  constructor(private readonly dataService: TableDataService) { }

  setOmapsData(version: ChooseVersion): void {
    const data = this.dataService.getData(version.file, displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
    this.columns = data.pipe(map(result => result.columns));
  }
  ngOnInit(): void {
    this.setOmapsData(omapsVersionData[0]);
    this.placeholderDate = omapsVersionData[0];
  }
}
