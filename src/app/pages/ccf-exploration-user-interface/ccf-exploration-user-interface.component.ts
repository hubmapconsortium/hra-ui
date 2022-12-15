import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';


@Component({
  selector: 'exploration-user-interface',
  templateUrl: './ccf-exploration-user-interface.component.html',
  styleUrls: ['./ccf-exploration-user-interface.component.scss']
})
export class CcfExplorationUserInterfaceComponent{
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
  playerTitle: string;

  constructor (route: ActivatedRoute){
    const data = route.snapshot.data['ccfExplorationUserInterface'];
    this.headerCardDetails = data.headerCardDetails;
    this.overviewData = data.overviewData;
    this.acknowledgeData = data.acknowledgeData;
    this.tutorialData = data.tutorialData;
    this.interfacedata = data.interfacedata;
    this.useEuiButton = data.useEuiButton;
    this.height = data.height;
    this.width = data.width;
    this.title = data.title;
    this.videoId = data.videoId;
    this.playerTitle = data.playerTitle;
  }
}
