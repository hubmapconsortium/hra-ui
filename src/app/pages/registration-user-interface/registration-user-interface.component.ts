import { Component } from '@angular/core';
import { headerCardDetails, overviewData, acknowledgeData, tutorialData, interfacedata } from './registration-user-interface.content';

@Component({
  selector: 'ccf-registration-user-interface',
  templateUrl: './registration-user-interface.component.html',
  styleUrls: ['./registration-user-interface.component.scss']
})

export class RegistrationUserInterfaceComponent{

  headerCardDetails = headerCardDetails;
  overviewData = overviewData;
  acknowledgeData = acknowledgeData;
  tutorialData = tutorialData;
  interfacedata = interfacedata;
  height = 584;
  width = 1232;
  title = "Overview";
  videoId = "gY3_-LIoKaU";
}
