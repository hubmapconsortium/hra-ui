import { Component } from '@angular/core';
import { headerCardDetails, overviewData, existingTablesData, exploreTablesData, sopLinksData } from './ccf-table-page.contents';

@Component({
  selector: 'ccf-table-page',
  templateUrl: './ccf-table-page.component.html',
  styleUrls: ['./ccf-table-page.component.scss']
})
export class CcfTablePageComponent {

  headerCardDetails = headerCardDetails;
  overviewData = overviewData;
  existingTablesData=existingTablesData;
  exploreTablesData=exploreTablesData;
  sopLinksData = sopLinksData



  constructor() { }

}
