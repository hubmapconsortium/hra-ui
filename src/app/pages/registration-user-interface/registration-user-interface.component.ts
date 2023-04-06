import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeModel } from 'src/app/components/youtube-model/youtube-model';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { SopLinks } from '../../components/sop-links/sop-links';
import { UseButton } from '../../components/use-button/use-button';


@Component({
  selector: 'registration-user-interface',
  templateUrl: './registration-user-interface.component.html',
  styleUrls: ['./registration-user-interface.component.scss']
})
export class RegistrationUserInterfaceComponent {
  headerCardDetails: PageHeaderItems[];
  overviewData: PageDataItems[];
  interfacedata: PageDataItems[];
  useRuiButton:UseButton;
  ruiSopData: SopLinks[];
  youtubePlayer: YoutubeModel;
  height: number;
  width: number;
  title: string;
  videoId: string;
  playerTitle: string;

  constructor(route: ActivatedRoute) {
    const data = route.snapshot.data['content'];
    this.headerCardDetails = data.headerCardDetails;
    this.overviewData = data.overviewData;
    this.interfacedata = data.interfacedata;
    this.useRuiButton = data.useRuiButton;
    this.ruiSopData = data.ruiSopData;
    this.youtubePlayer = data.youtubePlayer
    this.title = data.title;
    this.videoId = data.videoId;
    this.playerTitle = data.playerTitle;
    this.height = data.height;
    this.width = data.width;
  }
}
