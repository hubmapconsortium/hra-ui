import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

/** Component for LandingPage Intro - Web coomponent */
@Component({
  selector: 'ftu-ui-hra-landing-page-intro-wc',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './hra-landing-page-intro-wc.component.html',
  styleUrls: ['./hra-landing-page-intro-wc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HraLandingPageIntroWcComponent {
  /** Intro title for FTU Explorer */
  @Input() title = '';

  /** Description for FTU Explorer */
  @Input() description = '';

  /** Thank you message to partners */
  @Input() partners = '';

  /** Intro Image file url */
  @Input() readMore = '';
}
