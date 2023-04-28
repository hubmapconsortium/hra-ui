import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeModel } from '../../components/youtube-model/youtube-model';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';
import { PageDef } from 'src/app/components/page-element/page-def';

interface ExplorationUserInterface {
  headerCardDetails: PageHeaderItems[];
  overviewData: PageDataItems[];
  tutorialData: PageDataItems[];
  interfacedata: PageDataItems[];
  sopData: PageDataItems[];
  useEuiButton: UseButton;
  spatialSearchYoutubePlayer: YoutubeModel;
  euiDemoYoutubePlayer: YoutubeModel;
  howToUseSpatialSearch: PageDataItems[];
  howToNavigate3dSpace: PageDataItems[];
}

@Component({
  selector: 'exploration-user-interface',
  templateUrl: './ccf-exploration-user-interface.component.html',
  styleUrls: ['./ccf-exploration-user-interface.component.scss']
})
export class CcfExplorationUserInterfaceComponent {
  data = this.route.snapshot.data['content'] as PageDef[];
  // headerCardDetails = this.data.headerCardDetails;
  // overviewData = this.data.overviewData;
  // tutorialData = this.data.tutorialData;
  // interfacedata = this.data.interfacedata;
  // sopData = this.data.sopData;
  // useEuiButton = this.data.useEuiButton;
  // spatialSearchYoutubePlayer = this.data.spatialSearchYoutubePlayer;
  // euiDemoYoutubePlayer = this.data.euiDemoYoutubePlayer;
  // howToUseSpatialSearch = this.data.howToUseSpatialSearch;
  // howToNavigate3dSpace = this.data.howToNavigate3dSpace;
  
  constructor(private readonly route: ActivatedRoute) { }
}
