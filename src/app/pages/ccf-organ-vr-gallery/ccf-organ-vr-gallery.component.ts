import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';


@Component({
  selector: 'organ-vr-gallery',
  templateUrl: './ccf-organ-vr-gallery.component.html',
  styleUrls: ['./ccf-organ-vr-gallery.component.scss']
})
export class CcfOrganVrGalleryComponent {
  organVrHeader: PageHeaderItems[];
  overviewData: PageDataItems[];
  backgroundData: PageDataItems[];
  dataVisualizations: PageDataItems[];
  testingAndFeedback: PageDataItems[];
  whyVrData: PageDataItems[];
  height: number;
  width: number;
  title: string;
  videoId: string;
  playerTitle: string;
  referencesData: PageDataItems[];

  constructor(route: ActivatedRoute){
    const data = route.snapshot.data['content'];
    this.organVrHeader = data.organVrHeader;
    this.overviewData  = data.overviewData;
    this.backgroundData = data.backgroundData;
    this.dataVisualizations = data.dataVisualizations;
    this.testingAndFeedback = data.testingAndFeedback;
    this.height = data.height;
    this.width = data.width;
    this.title = data.title;
    this.videoId = data.videoId;
    this.playerTitle = data.playerTitle;
    this.referencesData = data.referencesData;
    this.whyVrData = data.whyVrData;
  }
}
