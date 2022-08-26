import { Component } from '@angular/core';
import { overviewData, sopData, termsOfUseData, twoDimHeaderCardDetails } from './two-dim-ref-page.contents';

@Component({
  selector: 'ccf-2d-route',
  templateUrl: './two-dim-ref-page.component.html',
  styleUrls: ['./two-dim-ref-page.component.scss']
})
export class TwoDimRefPageComponent {

  twoDimHeaderCardDetails = twoDimHeaderCardDetails
  overviewData=overviewData
  sopData = sopData
  termsOfUseData = termsOfUseData

  constructor() { }

}
