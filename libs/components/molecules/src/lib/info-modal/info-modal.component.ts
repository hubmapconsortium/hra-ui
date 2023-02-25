import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';

/**
 * HRA Info Modal Component
 */
@Component({
  selector: 'hra-info-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MarkdownModule],
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoModalComponent {
  /**
   * value to display.
   */
  @Input() text = '';

  /** Emitted when the close icon is clicked */
  @Output() readonly closeClick = new EventEmitter<void>();

  /**
   * Input for product logo URL to displayed on the left side.
   */
  @Input() productLogoUrl = '';

  /** Description for FTU Info Modal */
  @Input() description = '';
}
