import { Component, OnInit } from '@angular/core';
import { ChooseVersion } from 'src/app/components/choose-version/choose-version';
import { OrganData, VersionOrgans } from 'src/app/components/two-dim-image/two-dim-image';
import { headerData, overviewData, sopData, termsOfUseData, versionData } from './three-dim-ref-page.content';

@Component({
  selector: 'ccf-2d-reference-library',
  templateUrl: './three-dim-ref-page.component.html',
  styleUrls: ['./three-dim-ref-page.component.scss']
})
export class ThreeDimRefPageComponent implements OnInit {

  headerData = headerData
  overviewData = overviewData
  versionData = versionData
  sopData = sopData;
  termsOfUseData = termsOfUseData
  organData: OrganData[];
  information: VersionOrgans;
  placeholderDate: ChooseVersion;

  ngOnInit(): void {
    this.placeholderDate = versionData[0];
  }

}
