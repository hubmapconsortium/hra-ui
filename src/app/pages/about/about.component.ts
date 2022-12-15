import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';


@Component({
  selector: 'about-mc-iu',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  pageHeaderData: PageHeaderItems[];
  overview: PageDataItems[];
  history: PageDataItems[];
  references: PageDataItems[];
  presentations: PageDataItems[];
  acknowledgments: PageDataItems[];

  constructor(private route: ActivatedRoute) {
    const data = route.snapshot.data['about'];
    this.pageHeaderData = data.pageHeaderData;
    this.overview = data.overview;
    this.history = data.history;
    this.references = data.references;
    this.presentations = data.presentations;
    this.acknowledgments = data.acknowledgments;
  }
}
