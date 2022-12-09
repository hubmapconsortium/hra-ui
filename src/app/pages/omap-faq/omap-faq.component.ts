import { Component, OnInit } from '@angular/core';
import { authoringOmaps, backButton, faqPageHeader, generalOmapQuestions, tableOfContents } from './omap-faq.content';

@Component({
  selector: 'omap-faq',
  templateUrl: './omap-faq.component.html',
  styleUrls: ['./omap-faq.component.scss']
})
export class OmapFaqComponent {

  backButton = backButton
  faqPageHeader = faqPageHeader
  tableOfContents = tableOfContents
  generalOmapQuestions = generalOmapQuestions
  authoringOmaps = authoringOmaps
}
