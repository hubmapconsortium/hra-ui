import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Announcement } from 'src/app/components/announcement-card/announcement-card';
import { UseButton } from 'src/app/components/use-button/use-button';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { SopLinks } from '../../components/sop-links/sop-links';
import { OrganData, VersionOrgans } from '../../components/two-dim-image/two-dim-image';

interface ThreeDimRefPage {
  headerData: PageHeaderItems[];
  announcementDetails: Announcement[];
  overviewData: PageDataItems[];
  organCsvButton: UseButton;
  versionData: ChooseVersion[];
  sopData:SopLinks;
  termsOfUseData: PageDataItems[];
  licenseData: PageDataItems[];
  citationData: PageDataItems[];
  referencesData: PageDataItems[];
  referenceOrgans: PageDataItems[];
  threeDimOrganInfo: VersionOrgans[];
  cardTitle: string;
  tabsImages:OrganData[];
  organData: OrganData[];
  information: VersionOrgans;
  placeholderDate: ChooseVersion;
}

function iCaseEquals(str1: string, str2: string): boolean {
  return str1.toLowerCase() === str2.toLowerCase();
}

@Component({
  selector: 'ccf-3d-reference-library',
  templateUrl: './three-dim-ref-page.component.html',
  styleUrls: ['./three-dim-ref-page.component.scss']
})
export class ThreeDimRefPageComponent {
  cardTitle = '';
  tabsImages:OrganData[];
  organData: OrganData[];
  information: VersionOrgans;
  data = this.route.snapshot.data['content'] as ThreeDimRefPage;
  announcementDetails = this.data.announcementDetails;
  overviewData = this.data.overviewData;
  organCsvButton = this.data.organCsvButton;
  headerData = this.data.headerData;
  termsOfUseData = this.data.termsOfUseData;
  versionData = this.data.versionData;
  sopData = this.data.sopData;
  threeDimOrganInfo = this.data.threeDimOrganInfo;
  licenseData = this.data.licenseData;
  citationData = this.data.citationData;
  referencesData = this.data.referencesData;
  referenceOrgans = this.data.referenceOrgans;
  placeholderDate = this.versionData[0];

  constructor(private router: Router, private readonly route: ActivatedRoute) {
    const [{ version: defaultVersion, organData: [{ name: defaultOrgan }] }] = this.threeDimOrganInfo;
    const { version = defaultVersion, organ = defaultOrgan } = this.route.snapshot.queryParams;
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
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
