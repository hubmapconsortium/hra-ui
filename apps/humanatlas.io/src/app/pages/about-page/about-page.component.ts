import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { CardsModule } from '@hra-ui/design-system/cards';
import { ContentTemplatesModule } from '@hra-ui/design-system/content-templates';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';
import { MarkdownModule } from 'ngx-markdown';

import { AboutPageData } from '../../resolvers/about-page/about-page.schema';

/**
 * About page containing information about CNS, the CNS team, and editorial board
 */
@Component({
  selector: 'hra-about-page',
  imports: [
    HraCommonModule,
    ContentTemplatesModule,
    MarkdownModule,
    ButtonsModule,
    MatIconModule,
    CardsModule,
    TextHyperlinkDirective,
    TableOfContentsLayoutModule,
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  /** Viewport scroller manager */
  readonly viewport = inject(ViewportScroller);

  /** Page data */
  data = input.required<AboutPageData>();

  /**
   * Set offset value when scrolling between anchor links
   * @param viewport Viewport scroller manager
   */
  constructor() {
    this.viewport.setOffset([0, 104]);
  }
}
