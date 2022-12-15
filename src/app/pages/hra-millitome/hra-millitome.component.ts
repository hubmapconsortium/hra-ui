import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { TableData } from '../../components/table/table';
import { TableDataService } from '../../services/table-data/tabledata.service';
import { displayedColumnsData, headerInfo } from './hra-millitome.content';


@Component({
  selector: 'hra-millitome',
  templateUrl: './hra-millitome.component.html',
  styleUrls: ['./hra-millitome.component.scss']
})
export class HraMillitomeComponent implements OnInit {
  version: ChooseVersion = {release: 'hra-millitome.csv', version:''};
  headerCardDetails: PageHeaderItems[];
  overViewData: PageDataItems[];
  tableTitle: string;
  displayedColumnsData = displayedColumnsData;
  headerInfo = headerInfo;

  tableData: Observable<TableData[]> = EMPTY;
  columns: Observable<string[]> = EMPTY;

  constructor(private readonly dataService: TableDataService, route: ActivatedRoute) { 
    const data = route.snapshot.data['hraMillitome'];
    this.headerCardDetails = [data.headerCardDetails];
    this.overViewData = [data.overViewData];
    this.tableTitle = data.tableTitle;
  }

  setData(): void {
    const data = this.dataService.getData('hra-millitome.csv', displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
  }

  ngOnInit(): void {
    this.setData();
  }
}
