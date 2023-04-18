import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { UseButton } from 'src/app/components/use-button/use-button';

interface OmapFaq {
  backButton: UseButton;
  faqPageHeader: PageHeaderItems[];
  tableOfContents: PageDataItems[];
  generalOmapQuestions: PageDataItems[];
  authoringOmaps: PageDataItems[];
}

@Component({
  selector: 'omap-faq',
  templateUrl: './omap-faq.component.html',
  styleUrls: ['./omap-faq.component.scss']
})
export class OmapFaqComponent {
  constructor(private readonly route: ActivatedRoute) {}

  data = this.route.snapshot.data['content'] as OmapFaq;
  backButton = this.data.backButton;
  faqPageHeader = this.data.faqPageHeader;
  tableOfContents = this.data.tableOfContents;
  generalOmapQuestions = this.data.generalOmapQuestions;
  authoringOmaps = this.data.authoringOmaps;
}
