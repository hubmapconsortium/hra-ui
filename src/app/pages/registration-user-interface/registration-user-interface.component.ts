import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';
import { YoutubeModel } from 'src/app/components/youtube-model/youtube-model';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { SopLinks } from '../../components/sop-links/sop-links';
import { UseButton } from '../../components/use-button/use-button';

interface RegistrationUserInterface {
  headerCardDetails: PageHeaderItems[];
  overviewData: PageDataItems[];
  interfacedata: PageDataItems[];
  useRuiButton:UseButton;
  ruiSopData: SopLinks[];
  youtubePlayer: YoutubeModel;
}

@Component({
  selector: 'registration-user-interface',
  templateUrl: './registration-user-interface.component.html',
  styleUrls: ['./registration-user-interface.component.scss']
})
export class RegistrationUserInterfaceComponent {
  constructor(private readonly route: ActivatedRoute) { }
  
  data = this.route.snapshot.data['content'] as PageDef[];
  // headerCardDetails = this.data.headerCardDetails;
  // overviewData = this.data.overviewData;
  // interfacedata = this.data.interfacedata;
  // useRuiButton = this.data.useRuiButton;
  // ruiSopData = this.data.ruiSopData;
  // youtubePlayer = this.data.youtubePlayer
}
