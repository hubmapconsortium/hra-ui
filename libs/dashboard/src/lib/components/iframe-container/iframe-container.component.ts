import { ChangeDetectionStrategy, Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TITLE_CARD_DEF, TitleCardComponent } from '../title-card/title-card.component';
import { z } from 'zod';
import { DashboardComponentSpecFor } from '../../dashboard/dashboard.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'hra-iframe-container',
  standalone: true,
  imports: [CommonModule, TitleCardComponent],
  templateUrl: './iframe-container.component.html',
  styleUrl: './iframe-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframeContainerComponent implements OnInit {
  safeUrl!: SafeResourceUrl;

  static readonly def = TITLE_CARD_DEF.extend({
    type: z.literal('IFrameContainer'),
    iframeUrl: z.string(),
    aspectRatio: z.string().default('3/1'),
  });

  readonly spec = input.required<DashboardComponentSpecFor<typeof IframeContainerComponent>>();
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.spec().iframeUrl);
  }
}
