import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChooseVersion } from 'src/app/components/choose-version/choose-version';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { SopLinks } from 'src/app/components/sop-links/sop-links';
import { OrganData, VersionOrgans } from 'src/app/components/two-dim-image/two-dim-image';
import { overviewData, sopData, termsOfUseData, twoDimHeaderCardDetails, organInfo, versionData } from './two-dim-ref-page.contents';


function iCaseEquals(str1: string, str2: string): boolean {
  return str1.toLowerCase() === str2.toLowerCase();
}

@Component({
  selector: 'ccf-2d-ftu',
  templateUrl: './two-dim-ref-page.component.html',
  styleUrls: ['./two-dim-ref-page.component.scss']
})
export class TwoDimRefPageComponent implements OnInit {

  twoDimHeaderCardDetails: PageHeaderItems[];
  overviewData: PageDataItems[];
  sopData: SopLinks[];
  termsOfUseData: PageDataItems[];
  filterImages: OrganData[]
  cardTitle = "";
  versionData: ChooseVersion[]
  placeholderDate: string
  organData: OrganData[];
  info: VersionOrgans;
  version: ChooseVersion;
  organInfo: VersionOrgans[];


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const data = activatedRoute.snapshot.data['twoDimRefPage']
    this.twoDimHeaderCardDetails = data.twoDimHeaderCardDetails
    this.overviewData = data.overviewData
    this.sopData = data.sopData
    this.termsOfUseData = data.termsOfUseData
    this.versionData = data.versionData
    this.placeholderDate = this.versionData[0].release
    this.organInfo = data.organInfo
   }

  label: string;

  ngOnInit(): void {
    const [{ version: defaultVersion, organData: [{ name: defaultOrgan }] }] = this.organInfo;
    const { version = defaultVersion, organ = defaultOrgan } = this.activatedRoute.snapshot.queryParams;
    this.label = "Choose version of HRA release"

    this.setVersion(`${version}`, `${organ}`);
  }

  setVersion(version: string, organ?: string): void {
    const info = this.organInfo.find(item => iCaseEquals(item.version, version)) ?? this.organInfo[0];
    const choose = this.versionData.find(item => item.version === info.version)!;
    console.log(choose)
    this.info = info;
    this.version = choose;
    this.filterImages = info.organData
    this.setOrgan(organ ?? info.organData[0].name);
  }

  setOrgan(organ: string): void {
    const { info: { organData, version } } = this;
    const data = organData.filter(item => iCaseEquals(item.name, organ));

    if (data.length === 0) {
      this.setOrgan(organData[0].name);
    } else {
      this.organData = data;
      this.cardTitle = data[0].name + " Functional Tissue Units";
      this.updateQueryParams({ version, organ });
    }
  }

  updateQueryParams(params: Params): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }
}
