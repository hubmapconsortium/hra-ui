import { Component } from '@angular/core';
import { azimuthHeader, comparisonAsctbVsAzimuth, overviewAzimuthData, TermsOfUseData } from './ccf-asctb-azimuth.content';

@Component({
  selector: 'ccf-asctb-azimuth',
  templateUrl: './ccf-asctb-azimuth.component.html',
  styleUrls: ['./ccf-asctb-azimuth.component.scss']
})
export class CcfAsctbAzimuthComponent {
  azimuthHeader = azimuthHeader
  overviewAzimuthData = overviewAzimuthData
  TermsOfUseData = TermsOfUseData
  comparisonAsctbVsAzimuth = comparisonAsctbVsAzimuth
}
