import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';

interface ExplorationUserInterface {
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
}

@Component({
  selector: 'exploration-user-interface',
  templateUrl: './ccf-exploration-user-interface.component.html',
  styleUrls: ['./ccf-exploration-user-interface.component.scss']
})
export class CcfExplorationUserInterfaceComponent {
  data = this.route.snapshot.data['content'] as ExplorationUserInterface;
  headerCardDetails = this.data.headerCardDetails;
  overviewData = this.data.overviewData;
  acknowledgeData = this.data.acknowledgeData;
  tutorialData = this.data.tutorialData;
  interfacedata = this.data.interfacedata;
  useEuiButton = this.data.useEuiButton;
  height = this.data.height;
  width = this.data.width;
  title = this.data.title;
  videoId = this.data.videoId;
  playerTitle = this.data.playerTitle;
  
  constructor(private readonly route: ActivatedRoute) { }
}
