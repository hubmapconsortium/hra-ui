import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { UseButton } from 'src/app/components/use-button/use-button';
import { headerCardDetails, overviewData, acknowledgeData, useButtonData } from './ccf-asctb-reporter-page.content';

let apiLoaded = false;

@Component({
  selector: 'asctb-reporter',
  templateUrl: './ccf-asctb-reporter-page.component.html',
  styleUrls: ['./ccf-asctb-reporter-page.component.scss']
})
export class CcfReporterPageComponent {

  constructor (private route: ActivatedRoute){
    const data = route.snapshot.data['ccfReporterPage']
    this.headerCardDetails = data.headerCardDetails
    this.overviewData = data.overviewData
    this.acknowledgeData = data.acknowledgeData
    this.useButtonData = data.useButtonData
    this.height = data.height
    this.width = data.width
    this.title = data.title
    this.videoId = data.videoId
    this.playerTitle = data.playerTitle
  }



  headerCardDetails: PageHeaderItems[]
  overviewData: PageDataItems[]
  acknowledgeData: PageDataItems[]
  useButtonData: UseButton
  height: number
  width: number
  title: string
  videoId: string
  playerTitle: string


}
