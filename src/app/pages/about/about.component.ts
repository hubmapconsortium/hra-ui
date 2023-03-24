import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { TileDefinition } from '../../shared/simple-tile-items';

interface About {
  pageHeaderData: PageHeaderItems[];
  overview: PageDataItems[];
  history: PageDataItems[];
  references: PageDataItems[];
  presentations: PageDataItems[];
  acknowledgments: PageDataItems[];
}

@Component({
  selector: 'team',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  data = this.route.snapshot.data['content'] as About;
  pageHeaderData = this.data.pageHeaderData;
  overview = this.data.overview;
  history = this.data.history;
  references = this.data.references;
  presentations = this.data.presentations;
  acknowledgments = this.data.acknowledgments;
  tileDefinition = TileDefinition

  constructor(private readonly route: ActivatedRoute) { }
}
