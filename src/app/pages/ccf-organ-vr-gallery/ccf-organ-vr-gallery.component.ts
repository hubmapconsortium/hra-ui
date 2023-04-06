import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeModel } from 'src/app/components/youtube-model/youtube-model';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

interface CcfOrganVrGallery {
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
  vrGalleryDemo: YoutubeModel;
}

@Component({
  selector: 'organ-vr-gallery',
  templateUrl: './ccf-organ-vr-gallery.component.html',
  styleUrls: ['./ccf-organ-vr-gallery.component.scss']
})
export class CcfOrganVrGalleryComponent {
  data = this.route.snapshot.data['content'] as CcfOrganVrGallery;
  organVrHeader = this.data.organVrHeader;
  overviewData = this.data.overviewData;
  backgroundData = this.data.backgroundData;
  dataVisualizations = this.data.dataVisualizations;
  testingAndFeedback = this.data.testingAndFeedback;
  height = this.data.height;
  width = this.data.width;
  title = this.data.title;
  videoId = this.data.videoId;
  playerTitle = this.data.playerTitle;
  referencesData = this.data.referencesData;
  whyVrData = this.data.whyVrData;
  vrGalleryDemo = this.data.vrGalleryDemo;

  constructor(private readonly route: ActivatedRoute) { }
}
