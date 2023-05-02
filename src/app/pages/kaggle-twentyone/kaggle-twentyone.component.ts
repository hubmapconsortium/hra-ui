import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { PrizeCard } from '../../components/prize-card/prize-card';

interface KaggleTwentyOne {
  kaggle2021Header: PageHeaderItems[];
  overviewData: PageDataItems[];
  acknowledgmentsData: PageDataItems[];
  datasetsData: PageDataItems[];
  accuracyPrizeData: PrizeCard[];
  judgesPrizeData: PrizeCard[];
  kudosData: PrizeCard[];
  awardsCeremony: PageDataItems[];
}

@Component({
  selector: 'kaggle-one',
  templateUrl: './kaggle-twentyone.component.html',
  styleUrls: ['./kaggle-twentyone.component.scss']
})
export class KaggleTwentyoneComponent {
  constructor(private readonly route: ActivatedRoute) { }
  
  data = this.route.snapshot.data['content'] as PageDef[];
  // kaggle2021Header = this.data.kaggle2021Header;
  // overviewData = this.data.overviewData;
  // acknowledgmentsData = this.data.acknowledgmentsData;
  // datasetsData = this.data.datasetsData;
  // accuracyPrizeData = this.data.accuracyPrizeData;
  // kudosData = this.data.kudosData;
  // awardsCeremony = this.data.awardsCeremony;
  // judgesPrizeData = this.data.judgesPrizeData;
}
