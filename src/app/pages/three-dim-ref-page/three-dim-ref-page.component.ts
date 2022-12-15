import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChooseVersion } from 'src/app/components/choose-version/choose-version';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { SopLinks } from 'src/app/components/sop-links/sop-links';
import { OrganData, VersionOrgans } from 'src/app/components/two-dim-image/two-dim-image';

function iCaseEquals(str1: string, str2: string): boolean {
  return str1.toLowerCase() === str2.toLowerCase();
}

@Component({
  selector: 'ccf-3d-reference-library',
  templateUrl: './three-dim-ref-page.component.html',
  styleUrls: ['./three-dim-ref-page.component.scss']
})
export class ThreeDimRefPageComponent implements OnInit {

  headerData: PageHeaderItems[];
  overviewData: PageDataItems[];
  versionData: ChooseVersion[];
  sopData:SopLinks[];
  termsOfUseData: PageDataItems[];
  licenseData: PageDataItems[];
  citationData: PageDataItems[];
  acknowledgmentsData: PageDataItems[];
  referencesData: PageDataItems[];
  referenceOrgans: PageDataItems[];
  threeDimOrganInfo: VersionOrgans[];
  cardTitle="";
  tabsImages:OrganData[]
  organData: OrganData[];
  information: VersionOrgans;
  placeholderDate: ChooseVersion;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const data = activatedRoute.snapshot.data['threeDim'];
    this.overviewData = data.overviewData
    this.headerData = data.headerData
    this.termsOfUseData = data.termsOfUseData
    this.versionData = data.versionData
    this.sopData = data.sopData
    this.threeDimOrganInfo = data.threeDimOrganInfo
    this.licenseData = data.licenseData
    this.citationData = data.citationData
    this.acknowledgmentsData = data.acknowledgmentsData
    this.referencesData = data.referencesData
    this.referenceOrgans = data.referenceOrgans
  
  }

  ngOnInit(): void {
    this.placeholderDate = this.versionData[0];
    const [{ version: defaultVersion, organData: [{ name: defaultOrgan }] }] = this.threeDimOrganInfo;
    const { version = defaultVersion, organ = defaultOrgan } = this.activatedRoute.snapshot.queryParams;
    this.setVersion(`${version}`, `${organ}`);
  }

  setVersion(version: string, organ?: string): void {
    const info = this.threeDimOrganInfo.find(item => iCaseEquals(item.version, version)) ?? this.threeDimOrganInfo[0];
    const choose = this.versionData.find(item => item.version === info.version)!;

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
