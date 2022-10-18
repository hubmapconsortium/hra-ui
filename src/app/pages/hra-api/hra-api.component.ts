import { Component } from '@angular/core';
import { acknowledgmentsData, overviewData, pageHeaderData, useButtonData } from './hra-api.content';

@Component({
  selector: 'ccf-hra-api',
  templateUrl: './hra-api.component.html',
  styleUrls: ['./hra-api.component.scss']
})
export class HraApiComponent {

  pageHeaderData = pageHeaderData
  useButtonData = useButtonData
  overviewData = overviewData
  acknowledgmentsData = acknowledgmentsData
}
