import { Component } from '@angular/core';
import { accuracyPrizeData, acknowledgmentsData, judgesPrizesData, kaggle2022Header, overviewData } from './kaggle-two.content';

@Component({
  selector: 'kaggle-two',
  templateUrl: './kaggle-two.component.html',
  styleUrls: ['./kaggle-two.component.scss']
})
export class KaggleTwoComponent {
  kaggle2022Header = kaggle2022Header
  overviewData = overviewData
  accuracyPrizeData = accuracyPrizeData
  acknowledgmentsData = acknowledgmentsData
  judgesPrizesData = judgesPrizesData
}
