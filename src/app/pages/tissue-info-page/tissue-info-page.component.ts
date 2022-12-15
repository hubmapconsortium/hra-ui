import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TissueTableInfo } from '../../components/tissue-info-table/tissue-info-table';
import { descriptionData, tissueData } from './tissue-info-page.content';


@Component({
  selector: 'ccf-tissue-info-page',
  templateUrl: './tissue-info-page.component.html',
  styleUrls: ['./tissue-info-page.component.scss']
})
export class TissueInfoPageComponent {
  descriptionData = descriptionData;
  tissueData = tissueData;
  readonly data: TissueTableInfo;

  constructor(route: ActivatedRoute) {
    this.data = route.snapshot.data['data'];
  }
}
