import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { z } from 'zod';
import { DashboardComponentSpecFor } from '../../dashboard/dashboard.model';
import { TITLE_CARD_DEF, TitleCardComponent } from '../title-card/title-card.component';

@Component({
  selector: 'hra-iframe-container',
  standalone: true,
  imports: [CommonModule, TitleCardComponent],
  templateUrl: './iframe-container.component.html',
  styleUrl: './iframe-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframeContainerComponent {
  static readonly def = TITLE_CARD_DEF.extend({
    type: z.literal('IFrameContainer'),
    iframeUrl: z.string(),
    aspectRatio: z.string().default('3/1'),
  });

  readonly spec = input.required<DashboardComponentSpecFor<typeof IframeContainerComponent>>();

  protected readonly sanitizer = inject(DomSanitizer);
  protected iframeUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.spec().iframeUrl));
}
