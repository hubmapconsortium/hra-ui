import { Component, OnInit } from '@angular/core';
import { headerCardDetails, overviewData, acknowledgeData, tutorialData, interfacedata, useEuiButton } from './ccf-exploration-user-interface.content';
@Component({
  selector: 'exploration-user-interface',
  templateUrl: './ccf-exploration-user-interface.component.html',
  styleUrls: ['./ccf-exploration-user-interface.component.scss']
})
export class CcfExplorationUserInterfaceComponent{

  headerCardDetails = headerCardDetails;
  overviewData = overviewData;
  acknowledgeData = acknowledgeData;
  tutorialData = tutorialData;
  interfacedata = interfacedata;
  useEuiButton = useEuiButton
  height = 584;
  width = 1232;
  title = "Overview";
  videoId = "YAHJqvD3Q_8";
  playerTitle = "Tutorial"
}
