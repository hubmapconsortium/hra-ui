import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';

interface AsctbReporter {
  headerCardDetails: PageHeaderItems[];
  overviewData: PageDataItems[];
  useButtonData: UseButton;
  height: number;
  width: number;
  title: string;
  videoId: string;
  playerTitle: string;
}

@Component({
  selector: 'asctb-reporter',
  templateUrl: './ccf-asctb-reporter-page.component.html',
  styleUrls: ['./ccf-asctb-reporter-page.component.scss']
})
export class CcfReporterPageComponent {
  data = this.route.snapshot.data['content'] as AsctbReporter;
  headerCardDetails = this.data.headerCardDetails;
  overviewData = this.data.overviewData;
  useButtonData = this.data.useButtonData;
  height = this.data.height;
  width = this.data.width;
  title = this.data.title;
  videoId = this.data.videoId;
  playerTitle = this.data.playerTitle;

  constructor(private readonly route: ActivatedRoute) { }
}
