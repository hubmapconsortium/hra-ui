import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

/** Component for LandingPage Intro */
@Component({
  selector: 'hra-landing-page-intro',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MarkdownModule],
  templateUrl: './landing-page-intro.component.html',
  styleUrls: ['./landing-page-intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageIntroComponent {
  /** Intro title for FTU Explorer */
  @Input() title = '';

  /** Description for FTU Explorer */
  @Input() description = '';

  /** Thank you message to partners */
  @Input() partners = '';

  /** Intro Image file url */
  @Input() img = '';

  /** Text for more button */
  @Input() moreText = '';

  /** Emits when the more button is clicked */
  @Output() moreClick = new EventEmitter<void>();
}
