import { Component } from '@angular/core';
import { acknowledgmentsData, kaggle2021Header, overviewData } from './kaggle-twentyone.content';

@Component({
  selector: 'ccf-kaggle-twentyone',
  templateUrl: './kaggle-twentyone.component.html',
  styleUrls: ['./kaggle-twentyone.component.scss']
})
export class KaggleTwentyoneComponent {
  kaggle2021Header = kaggle2021Header
  overviewData = overviewData
  acknowledgmentsData = acknowledgmentsData
}
