import { Component } from '@angular/core';
import { accuracyPrizeData, acknowledgmentsData, datasetsData, judgesPrizeData, kaggle2021Header, kudosData, overviewData } from './kaggle-twentyone.content';

@Component({
  selector: 'ccf-kaggle-twentyone',
  templateUrl: './kaggle-twentyone.component.html',
  styleUrls: ['./kaggle-twentyone.component.scss']
})
export class KaggleTwentyoneComponent {
  kaggle2021Header = kaggle2021Header
  overviewData = overviewData
  acknowledgmentsData = acknowledgmentsData
  accuracyPrizeData = accuracyPrizeData
  judgesPrizeData = judgesPrizeData
  kudosData = kudosData
  datasetsData = datasetsData
}
