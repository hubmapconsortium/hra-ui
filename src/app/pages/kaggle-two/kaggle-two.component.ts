import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { PrizeCard } from 'src/app/components/prize-card/prize-card';
import { accuracyPrizeData, acknowledgmentsData, judgesPrizesData, kaggle2022Header, overviewData } from './kaggle-two.content';

@Component({
  selector: 'kaggle-two',
  templateUrl: './kaggle-two.component.html',
  styleUrls: ['./kaggle-two.component.scss']
})
export class KaggleTwoComponent {
  kaggle2022Header: PageHeaderItems[]
  overviewData: PageDataItems[]
  accuracyPrizeData: PrizeCard[]
  acknowledgmentsData: PageDataItems[]
  judgesPrizesData: PrizeCard[]


  constructor (private route: ActivatedRoute){
    const data = route.snapshot.data['kaggleTwo']
    this.kaggle2022Header = data.kaggle2022Header
    this.overviewData = data.overviewData
    this.accuracyPrizeData = data.accuracyPrizeData
    this.acknowledgmentsData = data.acknowledgmentsData
    this.judgesPrizesData = data.judgesPrizesData
  }
}
