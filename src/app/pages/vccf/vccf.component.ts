import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageDef } from 'src/app/components/page-element/page-def';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';

interface Vccf {
  pageHeader: PageHeaderItems[];
  overviewData: PageDataItems[];
  vccfDataFiles: PageDataItems[];
  termsOfUse: PageDataItems[];
  license: PageDataItems[];
  citation: PageDataItems[];
  references: PageDataItems[];
}

@Component({
  selector: 'ccf-vccf',
  templateUrl: './vccf.component.html',
  styleUrls: ['./vccf.component.scss']
})
export class VccfComponent {
  constructor(private readonly route: ActivatedRoute) { }

  data = this.route.snapshot.data['content'] as PageDef[];
  // pageHeader = this.data.pageHeader;
  // overviewData = this.data.overviewData;
  // vccfDataFiles = this.data.vccfDataFiles;
  // termsOfUse = this.data.termsOfUse;
  // license = this.data.license;
  // citation = this.data.citation;
  // references = this.data.references;
}
