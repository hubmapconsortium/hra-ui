import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY_LINK, LinkDirective } from '@hra-ui/cdk';
import { MarkdownModule } from 'ngx-markdown';

/**
 * Displays the image and also corresponding title and text along with a button to read more
 */
@Component({
  selector: 'hra-landing-page-in-depth',
  standalone: true,
  imports: [CommonModule, MarkdownModule, MatButtonModule, MatIconModule, LinkDirective],
  templateUrl: './landing-page-in-depth.component.html',
  styleUrls: ['./landing-page-in-depth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageInDepthComponent {
  /**  Image title shown to the user */
  @Input() title = '';

  /** Image description shown to the user */
  @Input() description = '';

  /** Image shown to the user */
  @Input() img = '';

  /** Text for more button */
  @Input() moreText = '';

  /** Link to navigate to on more button click */
  @Input() moreLink = EMPTY_LINK;
}
