import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { UseButton } from 'src/app/components/use-button/use-button';
import { headerCardDetails, overviewData, acknowledgeData, tutorialData, interfacedata, useEuiButton } from './ccf-exploration-user-interface.content';
@Component({
  selector: 'exploration-user-interface',
  templateUrl: './ccf-exploration-user-interface.component.html',
  styleUrls: ['./ccf-exploration-user-interface.component.scss']
})
export class CcfExplorationUserInterfaceComponent{
  
  constructor (private readonly route: ActivatedRoute){
    const data = route.snapshot.data['ccfExplorationUserInterface']
    this.headerCardDetails = data.headerCardDetails
    this.overviewData = data.overviewData
    this.acknowledgeData = data.acknowledgeData
    this.tutorialData = data.tutorialData
    this.interfacedata = data.interfacedata
    this.useEuiButton = data.useEuiButton
    this.height = data.height
    this.width = data.width
    this.title = data.title
    this.videoId = data.videoId
    this.playerTitle = data.playerTitle
  }
  
  headerCardDetails: PageHeaderItems[];
  overviewData: PageDataItems[];
  acknowledgeData: PageDataItems[]
  tutorialData: PageDataItems[];
  interfacedata: PageDataItems[];
  useEuiButton: UseButton;
  height: number;
  width: number;
  title: string;
  videoId: string;
  playerTitle: string
}
