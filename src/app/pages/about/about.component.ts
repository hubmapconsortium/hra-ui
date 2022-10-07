import { Component } from '@angular/core';
import { pageData, pageHeaderData } from './about.content';

@Component({
  selector: 'ccf-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  pageHeaderData = pageHeaderData
  pageData = pageData
}
