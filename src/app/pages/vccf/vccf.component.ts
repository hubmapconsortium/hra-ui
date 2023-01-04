import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';

@Component({
  selector: 'ccf-vccf',
  templateUrl: './vccf.component.html',
  styleUrls: ['./vccf.component.scss']
})
export class VccfComponent {
  pageHeader: PageHeaderItems[];
  overviewData: PageDataItems[];
  vccfDataFiles: PageDataItems[];
  termsOfUse: PageDataItems[];
  license: PageDataItems[];
  citation: PageDataItems[];
  acknowledgments: PageDataItems[];
  references: PageDataItems[];

  constructor(route: ActivatedRoute) {
    const data = route.snapshot.data['content'];
    this.pageHeader = data.pageHeader;
    this.overviewData = data.overviewData;
    this.vccfDataFiles = data.vccfDataFiles;
    this.termsOfUse = data.termsOfUse;
    this.license = data.license;
    this.citation = data.citation;
    this.acknowledgments = data.acknowledgments;
    this.references = data.references;
  }
}
