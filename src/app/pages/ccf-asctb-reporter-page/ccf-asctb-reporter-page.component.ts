import { TableDataService } from '../../services/table-data/tabledata.service';
import { TableData } from '../../components/table/table';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { Component, OnInit } from '@angular/core';
//import { headerCardDetails, overviewData, existingTablesData, exploreTablesData, sopLinksData, displayedColumnsData, headerInfo, versionData } from './ccf-asctb-reporter-page.contents';
import { headerCardDetails, overviewData, acknowledgeData, tutorialData } from './ccf-asctb-reporter-page.content';

let apiLoaded = false;

@Component({
  selector: 'ccf-asctb-reporter',
  templateUrl: './ccf-asctb-reporter-page.component.html',
  styleUrls: ['./ccf-asctb-reporter-page.component.scss']
})
export class CcfReporterPageComponent {
    headerCardDetails = headerCardDetails;
    overviewData = overviewData;
    acknowledgeData = acknowledgeData;
    tutorialData = tutorialData
    height = 584;
    width = 1232;
    title = "Overview";
    videoId = "N15e_kkmas4";

    

}