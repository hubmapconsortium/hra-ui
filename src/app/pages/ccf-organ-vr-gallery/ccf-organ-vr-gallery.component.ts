import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { backgroundData, dataVisualizations, organVrHeader, overviewData, referencesData, testingAndFeedback } from './ccf-organ-vr-gallery.content';

@Component({
  selector: 'organ-vr-gallery',
  templateUrl: './ccf-organ-vr-gallery.component.html',
  styleUrls: ['./ccf-organ-vr-gallery.component.scss']
})

export class CcfOrganVrGalleryComponent {

  constructor(private readonly route: ActivatedRoute){
    const data = route.snapshot.data['ccfOrganVrGallery']
    this.organVrHeader = data.organVrHeader       
    this.overviewData  = data.overviewData
    this.backgroundData = data.backgroundData     
    this.dataVisualizations = data.dataVisualizations   
    this.testingAndFeedback = data.testingAndFeedback
    this.height = data.height             
    this.width = data.width                
    this.title = data.title                
    this.videoId = data.videoId                
    this.playerTitle = data.playerTitle     
    this.referencesData = data.referencesData       

  }
  organVrHeader: PageHeaderItems[];
  overviewData: PageDataItems[];
  backgroundData: PageDataItems[];
  dataVisualizations: PageDataItems[];
  testingAndFeedback: PageDataItems[];
  height: number;
  width: number;
  title: string;
  videoId: string;
  playerTitle: string;
  referencesData: PageDataItems[];
}
