import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

interface HraSop {
  pageHeader: PageHeaderItems[];
  overviewData: PageDataItems[];
}

@Component({
  selector: 'standard-operating-procedures',
  templateUrl: './hra-sop.component.html',
  styleUrls: ['./hra-sop.component.scss']
})
export class HraSopComponent {
  data = this.route.snapshot.data['content'] as PageDef[];
  // pageHeader = this.data.pageHeader;
  // overviewData = this.data.overviewData;

  constructor(private readonly route: ActivatedRoute) {}
}
