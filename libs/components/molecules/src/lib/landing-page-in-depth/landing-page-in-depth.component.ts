import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';
/**
 * Displays the image and also corresponding title and text along with a button to read more
 */
@Component({
  selector: 'hra-landing-page-in-depth',
  standalone: true,
  imports: [CommonModule, MarkdownModule, MatButtonModule, MatIconModule],
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

  /** Emits when the more button is clicked */
  @Output() moreClick = new EventEmitter<void>();
}
