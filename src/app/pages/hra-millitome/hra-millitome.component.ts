import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { HeaderData } from 'src/app/components/table/header';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { TableData } from '../../components/table/table';
import { TableDataService } from '../../services/table-data/tabledata.service';


@Component({
  selector: 'hra-millitome',
  templateUrl: './hra-millitome.component.html',
  styleUrls: ['./hra-millitome.component.scss']
})
export class HraMillitomeComponent {
  version: ChooseVersion = {release: 'hra-millitome.csv', version:''};
  headerCardDetails: PageHeaderItems[];
  overViewData: PageDataItems[];
  tableTitle: string;
  headerInfo: HeaderData[];
  displayedColumnsData: string[];

  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;

  constructor(private readonly dataService: TableDataService, route: ActivatedRoute) { 
    const data = route.snapshot.data['content'];
    this.headerCardDetails = [data.headerCardDetails];
    this.overViewData = [data.overViewData];
    this.tableTitle = data.tableTitle;
    this.headerInfo = data.headerInfo;
    this.headerInfo = this.headerInfo.map((data) => ({
      ...data,
      cell: new Function('element', `return ${data.cell}`) as HeaderData['cell']
    }))
    this.displayedColumnsData = this.headerInfo.map(h => h.columnDef);
    this.setData();
  }

  setData(): void {
    const data = this.dataService.getData('hra-millitome.csv', this.displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
  }
}
