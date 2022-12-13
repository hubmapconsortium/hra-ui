import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { PrizeCard } from 'src/app/components/prize-card/prize-card';
import { accuracyPrizeData, acknowledgmentsData, datasetsData, judgesPrizeData, kaggle2021Header, kudosData, overviewData } from './kaggle-twentyone.content';

@Component({
  selector: 'kaggle-one',
  templateUrl: './kaggle-twentyone.component.html',
  styleUrls: ['./kaggle-twentyone.component.scss']
})
export class KaggleTwentyoneComponent {
  kaggle2021Header: PageHeaderItems[]
  overviewData: PageDataItems[]
  acknowledgmentsData: PageDataItems[]
  datasetsData: PageDataItems[]
  accuracyPrizeData: PrizeCard[]
  judgesPrizeData: PrizeCard[]
  kudosData: PrizeCard[]

  constructor(private route: ActivatedRoute){
    const data = route.snapshot.data['kaggleTwentyOne']
    this.kaggle2021Header = data.kaggle2021Header
    this.overviewData = data.overviewData
    this.acknowledgmentsData = data.acknowledgmentsData
    this.datasetsData = data.datasetsData
    this.accuracyPrizeData = data.accuracyPrizeData
    this.kudosData = data.kudosData
  }
}
