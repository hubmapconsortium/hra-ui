import { Component, OnInit } from '@angular/core';
import { headerCardDetails, overviewData, displayedColumnsData, headerInfo} from './hra-millitome.content';
import { EMPTY, Observable } from 'rxjs';
import { TableDataService } from '../../services/table-data/tabledata.service';
import { TableData } from '../../components/table/table';
import { ChooseVersion } from 'src/app/components/choose-version/choose-version';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { PageDataItems } from 'src/app/components/page-data/page-data';

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

  constructor(private readonly dataService: TableDataService, route: ActivatedRoute) { 
    const data = route.snapshot.data['hraMillitome'];
    this.headerCardDetails = [data.headerCardDetails]
    this.overViewData = [data.overViewData]
    this.tableTitle = data.tableTitle
  }

  setData(version: ChooseVersion): void {
    // this.tableData = this.dataService.getData(version.release);
  }

  ngOnInit(): void {
    this.setData(this.version);
  }

}
