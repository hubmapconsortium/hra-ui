import { Component } from '@angular/core';
import { pageHeader } from './hra-sop.content';

@Component({
  selector: 'ccf-hra-sop',
  templateUrl: './hra-sop.component.html',
  styleUrls: ['./hra-sop.component.scss']
})
export class HraSopComponent {
  pageHeader = pageHeader
}
