import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'hra-landing-page-intro',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MarkdownModule],
  templateUrl: './landing-page-intro.component.html',
  styleUrls: ['./landing-page-intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageIntroComponent {
  /** Input for title */
  @Input() title = '';

  /** Description for FTU */
  @Input()
  description = '';

  /** partners */
  @Input()
  partners = '';

  /** image file */
  @Input() img = '';

  /** Input for more text */
  @Input() moreText = '';

  /** Event emitter for explore button */
  @Output() moreClick = new EventEmitter<void>();
}
