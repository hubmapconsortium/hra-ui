import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { PrizeCard } from '../../components/prize-card/prize-card';


@Component({
  selector: 'kaggle-one',
  templateUrl: './kaggle-twentyone.component.html',
  styleUrls: ['./kaggle-twentyone.component.scss']
})
export class KaggleTwentyoneComponent {
  kaggle2021Header: PageHeaderItems[];
  overviewData: PageDataItems[];
  acknowledgmentsData: PageDataItems[];
  datasetsData: PageDataItems[];
  accuracyPrizeData: PrizeCard[];
  judgesPrizeData: PrizeCard[];
  kudosData: PrizeCard[];
  awardsCeremony: PageDataItems[];

  constructor(route: ActivatedRoute){
    const data = route.snapshot.data['content'];
    this.kaggle2021Header = data.kaggle2021Header;
    this.overviewData = data.overviewData;
    this.acknowledgmentsData = data.acknowledgmentsData;
    this.datasetsData = data.datasetsData;
    this.accuracyPrizeData = data.accuracyPrizeData;
    this.kudosData = data.kudosData;
    this.awardsCeremony = data.awardsCeremony;
    this.judgesPrizeData = data.judgesPrizeData;
  }
}
