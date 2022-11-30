import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { UseButton } from 'src/app/components/use-button/use-button';;
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ccf-hra-api',
  templateUrl: './hra-api.component.html',
  styleUrls: ['./hra-api.component.scss']
})
export class HraApiComponent {

  dataSubscription?: Subscription;
  pageHeaderData: PageHeaderItems[];
  useButtonData: UseButton;
  overviewData: PageDataItems[];
  acknowledgmentsData: PageDataItems[];  

  constructor(route: ActivatedRoute) {
    const data = route.snapshot.data['hraInfo'];
    this.pageHeaderData = [data.pageHeaderData]
    this.useButtonData = data.useButtonData
    this.overviewData = [data.overviewData]
    this.acknowledgmentsData = [data.acknowledgmentsData]
  }
}
