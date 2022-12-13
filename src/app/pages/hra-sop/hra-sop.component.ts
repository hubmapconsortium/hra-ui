import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { acknowledgmentsData, overviewData, pageHeader } from './hra-sop.content';

@Component({
  selector: 'standard-operating-procedures',
  templateUrl: './hra-sop.component.html',
  styleUrls: ['./hra-sop.component.scss']
})
export class HraSopComponent {
  pageHeader: PageHeaderItems[]
  tableTitle: string
  overviewData: PageDataItems[]
  acknowledgmentsData: PageDataItems[]

  constructor(private route: ActivatedRoute){
    const data = route.snapshot.data['hraSop']
    this.tableTitle = data.tableTitle
    this.pageHeader = [data.pageHeader]
    this.overviewData = [data.overviewData]
    this.acknowledgmentsData = [data.acknowledgmentsData]
    this.tableTitle = data.tableTitle
  }
}
