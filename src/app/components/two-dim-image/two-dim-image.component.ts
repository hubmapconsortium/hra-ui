import { Component, Input } from '@angular/core';
import { OrganData, TissueDetails } from './two-dim-image';

@Component({
  selector: 'ccf-two-dim-image',
  templateUrl: './two-dim-image.component.html',
  styleUrls: ['./two-dim-image.component.scss']
})
export class TwoDimImageComponent {

  @Input() cardTitle: string
  @Input() tissueData: OrganData[] = [];

  constructor() { }

}
