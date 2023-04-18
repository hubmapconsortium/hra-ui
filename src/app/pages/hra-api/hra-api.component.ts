import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';

interface HraApi {
  pageHeaderData: PageHeaderItems[];
  useButtonData: UseButton;
  overviewData: PageDataItems[];
}
 
@Component({
  selector: 'ccf-hra-api',
  templateUrl: './hra-api.component.html',
  styleUrls: ['./hra-api.component.scss']
})
export class HraApiComponent {

  constructor(private readonly route: ActivatedRoute) { }
  data = this.route.snapshot.data['content'] as HraApi;
  pageHeaderData = this.data.pageHeaderData;
  useButtonData = this.data.useButtonData;
  overviewData = this.data.overviewData;
}
