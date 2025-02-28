import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TissueTableInfo } from '../../components/tissue-info-table/tissue-info-table';
import { descriptionData, tissueData } from './tissue-info-page.content';

/** Displays TissueInfoTable on the current page */
@Component({
  selector: 'ccf-tissue-info-page',
  templateUrl: './tissue-info-page.component.html',
  styleUrls: ['./tissue-info-page.component.scss'],
  standalone: false,
})
export class TissueInfoPageComponent {
  /** Description of the tissue */
  descriptionData = descriptionData;

  /** Table data of the tissue */
  tissueData = tissueData;

  /** Initializes TissueTableInfo */
  readonly data: TissueTableInfo;

  /** Sets data from content.ts into TissueTableInfo data */
  constructor(route: ActivatedRoute) {
    this.data = route.snapshot.data['content'];
  }
}
