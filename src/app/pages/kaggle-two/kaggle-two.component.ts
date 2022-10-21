import { Component } from '@angular/core';
import { kaggle2022Header } from './kaggle-two.content';

@Component({
  selector: 'ccf-kaggle-two',
  templateUrl: './kaggle-two.component.html',
  styleUrls: ['./kaggle-two.component.scss']
})
export class KaggleTwoComponent {
  kaggle2022Header = kaggle2022Header
}
