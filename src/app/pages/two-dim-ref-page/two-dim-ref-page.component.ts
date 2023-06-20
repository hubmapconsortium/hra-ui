import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { Announcement } from 'src/app/components/announcement-card/announcement-card';
import { PageDef } from 'src/app/components/page-element/page-def';
import { HeaderData } from 'src/app/components/table/header';
import { TableData } from 'src/app/components/table/table';
import { TableDataService } from 'src/app/services/table-data/tabledata.service';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { SopLinks } from '../../components/sop-links/sop-links';
import { OrganData, VersionOrgans } from '../../components/two-dim-image/two-dim-image';


function iCaseEquals(str1: string, str2: string): boolean {
  return str1.toLowerCase() === str2.toLowerCase();
}

@Component({
  selector: 'ccf-2d-ftu',
  templateUrl: './two-dim-ref-page.component.html',
  styleUrls: ['./two-dim-ref-page.component.scss']
})
export class TwoDimRefPageComponent {
  data = this.route.snapshot.data['content'] as PageDef[];

  constructor(private readonly route: ActivatedRoute) { }
}
