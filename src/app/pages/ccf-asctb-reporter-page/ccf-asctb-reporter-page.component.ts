import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeModel } from 'src/app/components/youtube-model/youtube-model';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';

interface AsctbReporter {
  headerCardDetails: PageHeaderItems[];
  overviewData: PageDataItems[];
  useButtonData: UseButton;
  asctbReporterPlayer: YoutubeModel;
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
  asctbReporterPlayer = this.data.asctbReporterPlayer;

  constructor(private readonly route: ActivatedRoute) { }
}
