import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';


@Component({
  selector: 'standard-operating-procedures',
  templateUrl: './hra-sop.component.html',
  styleUrls: ['./hra-sop.component.scss']
})
export class HraSopComponent {
  pageHeader: PageHeaderItems[];
  tableTitle: string;
  overviewData: PageDataItems[];

  constructor(route: ActivatedRoute){
    const data = route.snapshot.data['content'];
    this.tableTitle = data.tableTitle;
    this.pageHeader = [data.pageHeader];
    this.overviewData = [data.overviewData];
  }
}
