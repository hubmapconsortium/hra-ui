import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { HeaderData } from 'src/app/components/table/header';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { TableData } from '../../components/table/table';
import { TableDataService } from '../../services/table-data/tabledata.service';

interface HraMillitome {
  headerCardDetails: PageHeaderItems[];
  overViewData: PageDataItems[];
  tableTitle: string;
  headerInfo: HeaderData[];
  displayedColumnsData: string[];
}

@Component({
  selector: 'hra-millitome',
  templateUrl: './hra-millitome.component.html',
  styleUrls: ['./hra-millitome.component.scss']
})
export class HraMillitomeComponent {
  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;
  data = this.route.snapshot.data['content'] as HraMillitome;
  headerCardDetails = this.data.headerCardDetails;
  overViewData = this.data.overViewData;
  tableTitle = this.data.tableTitle;
  headerInfo = this.data.headerInfo.map((data) => ({
    ...data,
    cell: new Function('element', `return ${data.cell}`) as HeaderData['cell']
  }))
  displayedColumnsData = this.headerInfo.map(h => h.columnDef);
  
  constructor(private readonly dataService: TableDataService, private readonly route: ActivatedRoute) { 
    this.setData();
  }

  setData(): void {
    const data = this.dataService.getData('hra-millitome.csv', this.displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
  }
}
