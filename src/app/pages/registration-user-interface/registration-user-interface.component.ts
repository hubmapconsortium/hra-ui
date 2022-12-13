import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { SopLinks } from 'src/app/components/sop-links/sop-links';
import { UseButton } from 'src/app/components/use-button/use-button';
import { headerCardDetails, overviewData, acknowledgeData, interfacedata, useRuiButton, ruiSopData } from './registration-user-interface.content';

@Component({
  selector: 'registration-user-interface',
  templateUrl: './registration-user-interface.component.html',
  styleUrls: ['./registration-user-interface.component.scss']
})

export class RegistrationUserInterfaceComponent{

  constructor (private route: ActivatedRoute){
    const data = route.snapshot.data['registrationUserInterface']
    this.headerCardDetails = data.headerCardDetails
    this.overviewData = data.overviewData
    this.acknowledgeData = data.acknowledgeData
    this.interfacedata = data.interfacedata
    this.useRuiButton = data.useRuiButton
    this.ruiSopData = data.ruiSopData
    this.title = data.title
    this.videoId = data.videoId
    this.playerTitle = data.playerTitle
    this.height = data.height
    this.width = data.width
  }

  headerCardDetails: PageHeaderItems[]
  overviewData: PageDataItems[]
  acknowledgeData:PageDataItems[]
  interfacedata: PageDataItems[]
  useRuiButton:UseButton
  ruiSopData: SopLinks[]
  height: number
  width: number
  title: string;
  videoId: string;
  playerTitle: string;
}
