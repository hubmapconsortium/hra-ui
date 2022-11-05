import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChooseVersion } from 'src/app/components/choose-version/choose-version';
import { OrganData, VersionOrgans } from 'src/app/components/two-dim-image/two-dim-image';
import { headerData, overviewData, sopData, termsOfUseData, threeDimOrganInfo, versionData } from './three-dim-ref-page.content';

function iCaseEquals(str1: string, str2: string): boolean {
  return str1.toLowerCase() === str2.toLowerCase();
}

@Component({
  selector: 'ccf-3d-reference-library',
  templateUrl: './three-dim-ref-page.component.html',
  styleUrls: ['./three-dim-ref-page.component.scss']
})
export class ThreeDimRefPageComponent implements OnInit {

  headerData = headerData
  overviewData = overviewData
  versionData = versionData
  sopData = sopData;
  termsOfUseData = termsOfUseData
  threeDimOrganInfo=threeDimOrganInfo
  cardTitle="";
  tabsImages:OrganData[]
  organData: OrganData[];
  information: VersionOrgans;
  placeholderDate: ChooseVersion;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.placeholderDate = versionData[0];
    const [{ version: defaultVersion, organData: [{ name: defaultOrgan }] }] = threeDimOrganInfo;
    const { version = defaultVersion, organ = defaultOrgan } = this.activatedRoute.snapshot.queryParams;

    this.setVersion(`${version}`, `${organ}`);
  }

  setVersion(version: string, organ?: string): void {
    const info = threeDimOrganInfo.find(item => iCaseEquals(item.version, version)) ?? threeDimOrganInfo[0];
    const choose = versionData.find(item => item.version === info.version)!;

    this.information = info;
    this.placeholderDate = choose;
    this.tabsImages = info.organData
    this.setOrgan(organ ?? info.organData[0].name);
  }

  setOrgan(organ: string): void {
    const { information: { organData, version } } = this;
    const data = organData.filter(item => iCaseEquals(item.name, organ));

    if (data.length === 0) {
      this.setOrgan(organData[0].name);
    } else {
      this.organData = data;
      this.cardTitle = data[0].name
      this.updateQueryParams({ version, organ });
    }
  }

  updateQueryParams(params: Params): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

}
