import { Component, OnInit } from '@angular/core';
import { headerCardDetails, overviewData} from './hra-millitome.content';

@Component({
  selector: 'ccf-hra-millitome',
  templateUrl: './hra-millitome.component.html',
  styleUrls: ['./hra-millitome.component.scss']
})
export class HraMillitomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  headerCardDetails = headerCardDetails;
  overViewData = overviewData;
}
