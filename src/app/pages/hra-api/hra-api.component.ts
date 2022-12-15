import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';

 
@Component({
  selector: 'ccf-hra-api',
  templateUrl: './hra-api.component.html',
  styleUrls: ['./hra-api.component.scss']
})
export class HraApiComponent {
  pageHeaderData: PageHeaderItems[];
  useButtonData: UseButton;
  overviewData: PageDataItems[];
  acknowledgmentsData: PageDataItems[];  

  constructor(route: ActivatedRoute) {
    const data = route.snapshot.data['hraInfo'];
    this.pageHeaderData = [data.pageHeaderData];
    this.useButtonData = data.useButtonData;
    this.overviewData = [data.overviewData];
    this.acknowledgmentsData = [data.acknowledgmentsData];
  }
}
