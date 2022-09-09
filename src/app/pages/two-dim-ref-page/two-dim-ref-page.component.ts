import { Component } from '@angular/core';
import { organTabs } from 'src/app/components/organ-tabs/organ-tabs';
import { OrganData } from 'src/app/components/two-dim-image/two-dim-image';
import { overviewData, sopData, tabsImages, termsOfUseData, twoDimHeaderCardDetails, organInfo, versionData } from './two-dim-ref-page.contents';

@Component({
  selector: 'ccf-2d-reference-library',
  templateUrl: './two-dim-ref-page.component.html',
  styleUrls: ['./two-dim-ref-page.component.scss']
})
export class TwoDimRefPageComponent {

  twoDimHeaderCardDetails = twoDimHeaderCardDetails
  overviewData = overviewData
  sopData = sopData
  termsOfUseData = termsOfUseData
  tabsImages = tabsImages
  cardTitle = "Kidney Function Tissue Units";
  versionData = versionData
  placeholderDate = versionData[0].release


  organData: OrganData[];

  constructor() {
    this.setOrgan(this.tabsImages[0].organName);
  }

  setOrgan(organ: string | undefined): void {
    this.organData = organInfo.filter(item => item.organName === organ)
  }
}
