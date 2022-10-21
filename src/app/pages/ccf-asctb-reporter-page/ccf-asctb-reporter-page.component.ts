import { Component } from '@angular/core';
import { headerCardDetails, overviewData, acknowledgeData, useButtonData } from './ccf-asctb-reporter-page.content';

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
  useButtonData = useButtonData
  height = 584;
  width = 1232;
  title = "Overview";
  videoId = "pzUFmDhQEO8";



}