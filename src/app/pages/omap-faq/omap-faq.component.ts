import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { UseButton } from 'src/app/components/use-button/use-button';

@Component({
  selector: 'omap-faq',
  templateUrl: './omap-faq.component.html',
  styleUrls: ['./omap-faq.component.scss']
})
export class OmapFaqComponent {
  backButton: UseButton;
  faqPageHeader: PageHeaderItems[];
  tableOfContents: PageDataItems[];
  generalOmapQuestions: PageDataItems[];
  authoringOmaps: PageDataItems[];

  constructor(route: ActivatedRoute) {
    const data = route.snapshot.data['content'];
    this.backButton = data.backButton;
    this.faqPageHeader = data.faqPageHeader;
    this.tableOfContents = data.tableOfContents;
    this.generalOmapQuestions = data.generalOmapQuestions;
    console.log(this.generalOmapQuestions)
    this.authoringOmaps = data.authoringOmaps;
  }
}
