import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';


@Component({
  selector: 'asctb-reporter',
  templateUrl: './ccf-asctb-reporter-page.component.html',
  styleUrls: ['./ccf-asctb-reporter-page.component.scss']
})
export class CcfReporterPageComponent {
  headerCardDetails: PageHeaderItems[];
  overviewData: PageDataItems[];
  acknowledgeData: PageDataItems[];
  useButtonData: UseButton;
  height: number;
  width: number;
  title: string;
  videoId: string;
  playerTitle: string;

  constructor (route: ActivatedRoute){
    const data = route.snapshot.data['content'];
    this.headerCardDetails = data.headerCardDetails;
    this.overviewData = data.overviewData;
    this.acknowledgeData = data.acknowledgeData;
    this.useButtonData = data.useButtonData;
    this.height = data.height;
    this.width = data.width;
    this.title = data.title;
    this.videoId = data.videoId;
    this.playerTitle = data.playerTitle;
  }
}
