import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { pageData, pageHeaderData } from './about.content';

@Component({
  selector: 'about-mc-iu',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  pageHeaderData: PageHeaderItems[]
  pageData: PageDataItems[]

  constructor (private route: ActivatedRoute){
    const data = route.snapshot.data['about']
    this.pageHeaderData = data.pageHeaderData
    this.pageData = data.pageData
  }
}
