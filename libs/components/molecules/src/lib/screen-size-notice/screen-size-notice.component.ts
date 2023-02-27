import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * The screen size notice component displays a notice for the users specifying the required screen size
 */
@Component({
  selector: 'hra-screen-size-notice',
  standalone: true,
  imports: [CommonModule, MarkdownModule, MatButtonModule, MatIconModule],
  templateUrl: './screen-size-notice.component.html',
  styleUrls: ['./screen-size-notice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSizeNoticeComponent {
  /**
   * Input for passing screen size notice content
   */
  @Input() contentUrl = '';

  /** Emits when the proceed button is clicked */
  @Output() proceedClick = new EventEmitter<void>();

  /** Emits when the portal button is clicked */
  @Output() portalClick = new EventEmitter<void>();
}
