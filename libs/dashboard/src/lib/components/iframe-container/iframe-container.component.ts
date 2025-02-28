import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { z } from 'zod';
import { DashboardComponentSpecFor } from '../../dashboard/dashboard.model';
import { TITLE_CARD_DEF, TitleCardComponent } from '../title-card/title-card.component';

/** Iframe Container Component, renders html document inside the container  */
@Component({
  selector: 'hra-iframe-container',
  imports: [CommonModule, TitleCardComponent],
  templateUrl: './iframe-container.component.html',
  styleUrl: './iframe-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframeContainerComponent {
  /** Input type for Iframe container component */
  static readonly def = TITLE_CARD_DEF.extend({
    type: z.literal('IFrameContainer'),
    iframeUrl: z.string(),
    aspectRatio: z.string().default('4/3'),
  });

  /** Input for Iframe container component */
  readonly spec = input.required<DashboardComponentSpecFor<typeof IframeContainerComponent>>();

  /** DomSanitizer instance */
  protected readonly sanitizer = inject(DomSanitizer);

  /** Computed safe url of iframe source url */
  protected iframeUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.spec().iframeUrl));
}
