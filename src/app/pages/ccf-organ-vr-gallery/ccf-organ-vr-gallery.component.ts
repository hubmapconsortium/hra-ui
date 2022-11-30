import { Component } from '@angular/core';
import { backgroundData, dataVisualizations, organVrHeader, overviewData, referencesData, testingAndFeedback } from './ccf-organ-vr-gallery.content';

@Component({
  selector: 'organ-vr-gallery',
  templateUrl: './ccf-organ-vr-gallery.component.html',
  styleUrls: ['./ccf-organ-vr-gallery.component.scss']
})

export class CcfOrganVrGalleryComponent {
  organVrHeader = organVrHeader
  overviewData = overviewData
  backgroundData = backgroundData
  dataVisualizations = dataVisualizations
  testingAndFeedback = testingAndFeedback
  height = 584;
  width = 1232;
  title = "Overview";
  videoId = "S9pBOlSfsnc";
  playerTitle = "Please view the video below for a demo of the CCF Organ VR Gallery."
  referencesData = referencesData
}
