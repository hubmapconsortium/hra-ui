import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { TableData } from 'src/app/components/table/table';
import { TableDataService } from 'src/app/services/table-data/tabledata.service';
import { displayedColumnsData, headerInfo, pageHeader } from './hra-sop.content';

@Component({
  selector: 'ccf-hra-sop',
  templateUrl: './hra-sop.component.html',
  styleUrls: ['./hra-sop.component.scss']
})
export class HraSopComponent implements OnInit {
  pageHeader = pageHeader
  tableTitle = "Standard Operating Procedures";
  tableFile = "hra-sop.csv";
  displayedColumnsData = displayedColumnsData
  headerInfo = headerInfo

  tableData: Observable<TableData[]> = EMPTY;
  constructor(private readonly dataService: TableDataService) { }

  setData(file:string){
    this.tableData = this.dataService.getData(file);
  }

  ngOnInit(): void {
    this.setData(this.tableFile)
  }
}
