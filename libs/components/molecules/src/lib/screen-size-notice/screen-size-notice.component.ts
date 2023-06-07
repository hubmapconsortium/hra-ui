import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY_LINK, LinkDirective } from '@hra-ui/cdk';

/**
 * The screen size notice component displays a notice for the users specifying the required screen size
 */
@Component({
  selector: 'hra-screen-size-notice',
  standalone: true,
  imports: [CommonModule, MarkdownModule, MatButtonModule, MatIconModule, LinkDirective],
  templateUrl: './screen-size-notice.component.html',
  styleUrls: ['./screen-size-notice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSizeNoticeComponent {
  /**
   * Input for passing screen size notice content
   */
  @Input() content = '';

  @Input() portal = EMPTY_LINK;

  /** Emits when the proceed button is clicked */
  @Output() readonly proceedClick = new EventEmitter<void>();
}
