import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChooseVersion } from 'src/app/components/choose-version/choose-version';
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

  twoDimHeaderCardDetails = twoDimHeaderCardDetails
  overviewData = overviewData
  sopData = sopData
  termsOfUseData = termsOfUseData
  filterImages: OrganData[]
  cardTitle = "";
  versionData = versionData
  placeholderDate = versionData[0].release
  organData: OrganData[];
  info: VersionOrgans;
  version: ChooseVersion;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const [{ version: defaultVersion, organData: [{ name: defaultOrgan }] }] = organInfo;
    const { version = defaultVersion, organ = defaultOrgan } = this.activatedRoute.snapshot.queryParams;

    this.setVersion(`${version}`, `${organ}`);
  }

  setVersion(version: string, organ?: string): void {
    const info = organInfo.find(item => iCaseEquals(item.version, version)) ?? organInfo[0];
    const choose = versionData.find(item => item.version === info.version)!;

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
      this.cardTitle = data[0].name+" Functional Tissue Units";
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
